import { buildingBlocksInitialState, layoutBlocksInitialState } from '../initial.constants';
import * as scriptApi from '../../../api/builder/script';
import * as contentApi from '../../../api/builder/email_contents';
import * as resourceManager from './resourceManager';
import * as templateApi from '../../../api/builder/templates';
import { v4 as uuidv4 } from 'uuid';
import { RootHtml, MailEditorToHTML } from '../../../helpers/TypeResolverComponent';
import { renderToStaticMarkup } from 'react-dom/server';

export function initBlock(block) {
  if (Array.isArray(block)) {
    return block.map(initBlock);
  }

  const allBlocks = [...buildingBlocksInitialState, ...layoutBlocksInitialState];
  const blockInfo = allBlocks.find((_block) => _block.type === block?.type);

  if (!blockInfo) {
    return null;
  }

  const newBlock = { ...blockInfo, id: block.id, params: { ...blockInfo.params, ...block.params } };

  if (Array.isArray(newBlock.params.child)) {
    newBlock.params.child = newBlock.params.child.map((childBlock) => {
      const initializedChild = initBlock(childBlock);

      if (initializedChild && Array.isArray(initializedChild.params.child)) {
        initializedChild.params.child = initializedChild.params.child.map(initBlock);
      }

      return initializedChild;
    });
  }

  return newBlock;
}

export function filterBlockProperties(block) {
  if (block instanceof Array) {
    return block.map((_block) => filterBlockProperties(_block));
  }
  const newBlock = {
    id: block?.id,
    type: block?.type,
    params: block?.params,
  };

  if (newBlock.type?.startsWith('layout')) {
    newBlock.params.child = newBlock.params.child.map((child) => {
      return {
        id: child.id,
        children: filterBlockProperties(child.children),
      };
    });
  } else if (newBlock.params && 'child' in newBlock.params) {
    newBlock.params.child = filterBlockProperties(newBlock.params.child);
  }

  return block;
}

export function cloneBlock(block) {
  if (block?.type?.startsWith('layout')) {
    return {
      ...block,
      id: uuidv4(),
      params: {
        ...JSON.parse(JSON.stringify(block.params)),
        child: block.params.child.map((child) => ({
          ...child,
          id: uuidv4(),
          children: child.children.map(cloneBlock),
        })),
      },
    };
  } else if ('child' in block.params) {
    return {
      ...block,
      id: uuidv4(),
      params: {
        ...JSON.parse(JSON.stringify(block.params)),
        child: block.params.child.map(cloneBlock),
      },
    };
  } else {
    return {
      ...block,
      id: uuidv4(),
      params: JSON.parse(JSON.stringify(block.params)),
    };
  }
}

export function findBlockById(blocks, id) {
  if (!blocks || !Array.isArray(blocks)) return null;

  for (let block of blocks) {
    if (block?.id === id) {
      return block;
    }
    if (block?.type?.startsWith('layout')) {
      for (let i = 0; i < block?.params?.child?.length; i++) {
        if (block?.params?.child[i]?.children.length) {
          if (block?.params?.child[i]?.id === id) {
            return block?.params?.child[i]?.children[0];
          }
          const childBlock = findBlockById(block?.params?.child[i]?.children, id);
          if (childBlock) {
            return childBlock;
          }
        }
      }
    } else if (block?.params && 'child' in block?.params) {
      const childBlock = findBlockById(block.params.child, id);
      if (childBlock) {
        return childBlock;
      }
    }
  }
  return null;
}

export function removeBlockById(blocks, id) {
  return blocks
    .filter((block) => block.id !== id)
    .map((block) => {
      if (block.type.startsWith('layout')) {
        return {
          ...block,
          params: {
            ...block.params,
            child: block.params.child.map((child) => ({
              ...child,
              children: child.children.filter((childBlock) => childBlock.id !== id),
            })),
          },
        };
      } else if ('child' in block.params) {
        return {
          ...block,
          params: {
            ...block.params,
            child: block.params.child.filter((childBlock) => childBlock.id !== id),
          },
        };
      } else {
        return block;
      }
    });
}

export function updateBlockById(blocks, id, field, value) {
  if (!Array.isArray(blocks)) {
    return blocks;
  }

  return blocks?.map((block) => {
    if (block?.id === id || block.type?.startsWith('icon_block')) {
      return {
        ...block,
        params: {
          ...block?.params,
          [field]: value,
        },
      };
    }
    if (block?.type?.startsWith('layout')) {
      return {
        ...block,
        params: {
          ...block?.params,
          child: block?.params?.child?.map((child) => {
            if (child?.id === id) {
              return {
                ...child,
                children: value,
              };
            } else {
              return {
                ...child,
                children: updateBlockById(child.children, id, field, value),
              };
            }
          }),
        },
      };
    } else if (block?.params && 'child' in block?.params) {
      return {
        ...block,
        params: {
          ...block.params,
          child: updateBlockById(block.params.child, id, field, value),
        },
      };
    }
    return block;
  });
}

export function duplicateBlockById(blocks, id) {
  const blockIndex = blocks.findIndex((block) => block.id === id);
  const block = cloneBlock(blocks[blockIndex]);
  return [...blocks.slice(0, blockIndex + 1), block, ...blocks.slice(blockIndex + 1)];
}

export function buildFinalHTML(mailEditorState) {
  return renderToStaticMarkup(<RootHtml>{MailEditorToHTML({ mailEditorState })}</RootHtml>);
}
