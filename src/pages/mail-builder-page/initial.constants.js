import { v4 as uuidv4 } from 'uuid';
import { ThirtySeventyBlockIcon } from '../../components/mail-block-icons/ThirtySeventyBlockIcon';
import { ThirtyThreeBlockIcon } from '../../components/mail-block-icons/ThirtyThreeBlockIcon';
import { TwentyFiveByFourBlockIcon } from '../../components/mail-block-icons/TwentyFiveByFourBlockIcon';
import { SixteenSixBlockIcon } from '../../components/mail-block-icons/SyxteenBlockIcon';
import { ParagraphIcon } from '../../components/mail-block-icons/ParagraphIcon';
import { HeaderIcon } from '../../components/mail-block-icons/HeaderIcon';
import { ListIcon } from '../../components/mail-block-icons/ListIcon';
import { ButtonIcon } from '../../components/mail-block-icons/ButtonIcon';
import { DividerIcon } from '../../components/mail-block-icons/DividerIcon';
import { ImageIcon } from '../../components/mail-block-icons/ImageIcon';
import { SpacingIcon } from '../../components/mail-block-icons/SpacingIcon';
import { SocialIcon } from '../../components/mail-block-icons/SocialIcon';
import { HtmlIcon } from '../../components/mail-block-icons/HtmlIcon';
import { FooterIcon } from '../../components/mail-block-icons/FooterIcon';
import { VideoIcon } from '../../components/mail-block-icons/VideoIcon';
import { GiphyIcon } from '../../components/mail-block-icons/GiphyIcon';
import { FortySixtyBlockIcon } from '../../components/mail-block-icons/FortySixtyBlockIcon';
import { FiftyFiftyBlockIcon } from '../../components/mail-block-icons/FiftyFiftyBlockIcon';
import { SixtyFortyBlockIcon } from '../../components/mail-block-icons/SixtyFortyBlockIcon';
import { SeventyThirtyBlockIcon } from '../../components/mail-block-icons/SeventyThirtyBlockIcon';
import { TwentyFiveFiftyBlockIcon } from '../../components/mail-block-icons/TwentyFiveFiftyBlockIcon';
import { TwentyFiveFiftyTwentyFiveBlockIcon } from '../../components/mail-block-icons/TwentyFiveFiftyTwentyFiveBlockIcon';
import { FiftyTwentyFiveBlockIcon } from '../../components/mail-block-icons/FiftyTwentyFiveBlockIcon';
import { ParagraphBuildBlock } from './mail-sidebar/text-tabs/ParagraphBuildBlock';
import { HeadingBuildBlock } from './mail-sidebar/text-tabs/HeadingBuildBlock';
import { ListBuildBlock } from './mail-sidebar/text-tabs/ListBuildBlock';
import { ButtonBuildBlock } from './mail-sidebar/button-tabs/ButtonBuildBlock';
import { ImageBuildBlock } from './mail-sidebar/image-tabs/ImageBuildBlock';
import { SpacingBuildBlock } from './mail-sidebar/spacing-tabs/SpacingBuildBlock';
import { DividerBuildBlock } from './mail-sidebar/divider-tabs/DividerBuildBlock';
import { LayoutContainerBlock } from './mail-editor/LayoutContainerBlock';
import { SocialBuildBlock } from './mail-sidebar/social-tabs/SocialBuildBlock';
import { HtmlBuildBlock } from './mail-sidebar/html-tabs/HtmlBuildBlock';
import { FooterBuildBlock } from './mail-sidebar/footer-tabs/FooterBuildBlock';
import { VideoBuildBlock } from './mail-sidebar/video-tabs/VideoBuildBlock';
import { GiphyBuildBlock } from './mail-sidebar/giphy-tabs/GiphyBuildBlock';
import Instagram from '../../assets/images/footer/Instagram.png';
import Twitter from '../../assets/images/footer/Twitter.png';

export const buildingBlocksInitialState = [
  {
    id: uuidv4(),
    icon: ParagraphIcon,
    content: ParagraphBuildBlock,
    title: 'Paragraph',
    tabs: 'orthographyTabs',
    type: 'paragraph_block',
    params: {
      text: 'This is a paragraph.',
      style: {},
    },
  },
  {
    id: uuidv4(),
    icon: HeaderIcon,
    content: HeadingBuildBlock,
    title: 'Header',
    tabs: 'orthographyTabs',
    type: 'heading_block',
    params: {
      text: 'This is a heading.',
      style: {},
    },
  },
  {
    id: uuidv4(),
    icon: ListIcon,
    content: ListBuildBlock,
    title: 'List',
    tabs: 'orthographyTabs',
    type: 'list_block',
    params: {
      text: '<li>This is an unordered list.</li>',
      style: {
        textAlign: 'left',
      },
    },
  },
  {
    id: uuidv4(),
    icon: ButtonIcon,
    content: ButtonBuildBlock,
    title: 'Button',
    tabs: 'buttonTabs',
    type: 'button_block',
    params: {
      text: 'Button',
      style: {},
    },
  },
  {
    id: uuidv4(),
    icon: ImageIcon,
    content: ImageBuildBlock,
    title: 'Image',
    tabs: 'imageTabs',
    type: 'image_block',
    params: {
      style: {},
      url: '',
      alt: '',
      resource_id: null,
      cid: null,
    },
  },
  {
    id: uuidv4(),
    icon: SpacingIcon,
    content: SpacingBuildBlock,
    title: 'Spacing',
    tabs: 'spacingTabs',
    type: 'spacing_block',
    params: {
      style: {},
    },
  },
  {
    id: uuidv4(),
    icon: DividerIcon,
    content: DividerBuildBlock,
    title: 'Divider',
    tabs: 'dividerTabs',
    type: 'divider_block',
    params: {
      style: {},
    },
  },
  {
    id: uuidv4(),
    icon: SocialIcon,
    content: SocialBuildBlock,
    title: 'Social',
    tabs: 'socialTabs',
    type: 'social_block',
    params: {
      text: 'bla',
      style: {},
    },
  },
  {
    id: uuidv4(),
    icon: HtmlIcon,
    content: HtmlBuildBlock,
    title: 'HTML',
    tabs: 'htmlTabs',
    type: 'html_block',
    params: {
      text: '<p style="color:green; font-weight:bold; text-align: center">mail is the best</p>',
      style: {},
    },
  },
  {
    id: uuidv4(),
    icon: FooterIcon,
    content: FooterBuildBlock,
    title: 'Footer',
    tabs: 'footerTabs',
    type: 'footer_block',
    params: {
      text: 'Unsubscribe',
      style: {},
      child: [
        {
          id: uuidv4(),
          icon: Instagram,
          type: 'icon_block',
          params: {
            title: 'Instagram',
            style: {},
            url: '',
            alt: '',
            tempUrl: '',
            resource_id: null,
            cid: null,
          },
        },
        {
          id: uuidv4(),
          icon: Twitter,
          type: 'icon_block',
          params: {
            title: 'Twitter',
            style: {},
            url: '',
            alt: '',
            tempUrl: '',
            resource_id: null,
            cid: null,
          },
        },
      ],
    },
  },
  {
    id: uuidv4(),
    icon: VideoIcon,
    content: VideoBuildBlock,
    title: 'Video',
    tabs: 'videoTabs',
    type: 'video_video',
    params: {
      url: '',
      video: '',
      style: {},
    },
  },
  {
    id: uuidv4(),
    icon: GiphyIcon,
    content: GiphyBuildBlock,
    title: 'Giphy',
    tabs: 'giphyTabs',
    type: 'giphy_block',
    params: {
      url: '',
      style: {},
    },
  },
  // {
  //   id: uuidv4(),
  //   icon: null,
  //   content: null,
  //   title: 'Personalization',
  //   tabs: 'personalizationTabs',
  //   type: 'personalization_block',
  //   params: {
  //     field: 'user.email',
  //     if_exists: [],
  //     if_not_exists: [],
  //     style: {},
  //   },
  // },
  // {
  //   id: uuidv4(),
  //   icon: null,
  //   content: null,
  //   title: 'AB-Test content',
  //   tabs: 'abTestTabs',
  //   type: 'ab_test_block',
  //   params: {
  //     variants: {
  //       default: [],
  //     },
  //     style: {},
  //   },
  // },
];

export const initial_30_70_LayoutChildBlock = Array.from({ length: 2 }, () => ({
  id: uuidv4(),
  children: [],
}));

export const initial_40_60_LayoutChildBlock = Array.from({ length: 2 }, () => ({
  id: uuidv4(),
  children: [],
}));

export const initial_50_50_LayoutChildBlock = Array.from({ length: 2 }, () => ({
  id: uuidv4(),
  children: [],
}));

export const initial_60_40_LayoutChildBlock = Array.from({ length: 2 }, () => ({
  id: uuidv4(),
  children: [],
}));

export const initial_70_30_LayoutChildBlock = Array.from({ length: 2 }, () => ({
  id: uuidv4(),
  children: [],
}));

export const initial_3_by_33_LayoutChildBlock = Array.from({ length: 3 }, () => ({
  id: uuidv4(),
  children: [],
}));

export const initial_25_25_50_LayoutChildBlock = Array.from({ length: 3 }, () => ({
  id: uuidv4(),
  children: [],
}));

export const initial_25_50_25_LayoutChildBlock = Array.from({ length: 3 }, () => ({
  id: uuidv4(),
  children: [],
}));

export const initial_50_25_25_LayoutChildBlock = Array.from({ length: 3 }, () => ({
  id: uuidv4(),
  children: [],
}));

export const initial_4_by_25_LayoutChildBlock = Array.from({ length: 4 }, () => ({
  id: uuidv4(),
  children: [],
}));

export const initial_16_by_6_LayoutChildBlock = Array.from({ length: 6 }, () => ({
  id: uuidv4(),
  children: [],
}));

export const layoutBlocksInitialState = [
  {
    id: uuidv4(),
    icon: ThirtySeventyBlockIcon,
    content: LayoutContainerBlock,
    width: ['30%', '70%'],
    type: 'layout_30_70',
    params: {
      child: initial_30_70_LayoutChildBlock,
    },
  },
  {
    id: uuidv4(),
    icon: FortySixtyBlockIcon,
    content: LayoutContainerBlock,
    width: ['40%', '60%'],
    type: 'layout_40_60',
    params: {
      child: initial_40_60_LayoutChildBlock,
    },
  },
  {
    id: uuidv4(),
    icon: FiftyFiftyBlockIcon,
    content: LayoutContainerBlock,
    width: ['50%', '50%'],
    type: 'layout_50x2',
    params: {
      child: initial_50_50_LayoutChildBlock,
    },
  },
  {
    id: uuidv4(),
    icon: SixtyFortyBlockIcon,
    content: LayoutContainerBlock,
    width: ['60%', '40%'],
    type: 'layout_60_40',
    params: {
      child: initial_60_40_LayoutChildBlock,
    },
  },
  {
    id: uuidv4(),
    icon: SeventyThirtyBlockIcon,
    content: LayoutContainerBlock,
    width: ['70%', '30%'],
    type: 'layout_70_30',
    params: {
      child: initial_70_30_LayoutChildBlock,
    },
  },
  {
    id: uuidv4(),
    icon: ThirtyThreeBlockIcon,
    content: LayoutContainerBlock,
    width: ['33%', '33%', '33%'],
    type: 'layout_33x3',
    params: {
      child: initial_3_by_33_LayoutChildBlock,
    },
  },
  {
    id: uuidv4(),
    icon: TwentyFiveFiftyBlockIcon,
    content: LayoutContainerBlock,
    width: ['25%', '25%', '50%'],
    type: 'layout_25x3_50',
    params: {
      child: initial_25_25_50_LayoutChildBlock,
    },
  },
  {
    id: uuidv4(),
    icon: TwentyFiveFiftyTwentyFiveBlockIcon,
    content: LayoutContainerBlock,
    width: ['25%', '50%', '25%'],
    type: 'layout_25_50_25',
    params: {
      child: initial_25_50_25_LayoutChildBlock,
    },
  },
  {
    id: uuidv4(),
    icon: FiftyTwentyFiveBlockIcon,
    content: LayoutContainerBlock,
    width: ['50%', '25%', '25%'],
    type: 'layout_50_23x2',
    params: {
      child: initial_50_25_25_LayoutChildBlock,
    },
  },
  {
    id: uuidv4(),
    icon: TwentyFiveByFourBlockIcon,
    content: LayoutContainerBlock,
    width: ['25%', '25%', '25%', '25%'],
    type: 'layout_25x4',
    params: {
      child: initial_4_by_25_LayoutChildBlock,
    },
  },
  {
    id: uuidv4(),
    icon: SixteenSixBlockIcon,
    content: LayoutContainerBlock,
    width: ['16%', '16%', '16%', '16%', '16%', '16%'],
    type: 'layout_16x6',
    params: {
      child: initial_16_by_6_LayoutChildBlock,
    },
  },
];

export const initEditorMediaQuery = 600;
export const initDesktopMediaQuery = 700;
export const initMobileMediaQuery = 320;
