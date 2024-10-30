import { BuildingBlocksList } from './blocks-tabs/BuildingBlocksList';
import { LayoutBlocksList } from './blocks-tabs/LayoutBlocksList';
import { SettingBlocks } from './blocks-tabs/SettingBlocks';
import { MarkupEditor } from './text-tabs/markup-editor/MarkupEditor';
import { MarkupSettings } from './text-tabs/MarkupSettings';
import { ButtonEditor } from './button-tabs/ButtonEditor';
import { ImageEditor } from './image-tabs/ImageEditor';
import { ButtonSettings } from './button-tabs/ButtonSettings';
import { ImageSettings } from './image-tabs/ImageSettings';
import { HtmlEditor } from './html-tabs/HtmlEditor';
import { VideoEditor } from './video-tabs/VideoEditor';
import { VideoSettings } from '@mui/icons-material';
import { GiphyEditor } from './giphy-tabs/GiphyEditor';
import { GiphySettings } from './giphy-tabs/GiphySettings';
import { FooterEditor } from './footer-tabs/FooterEditor';
import { FooterSettings } from './footer-tabs/FooterSettings';
import { SpacingContent } from './spacing-tabs/SpacingContent';
import { SpacingSettings } from './spacing-tabs/SpacingSettings';
import { DividerEditor } from './divider-tabs/DividerEditor';
import { DividerSettings } from './divider-tabs/DividerSettings';
import { SocialEditor } from './social-tabs/SocialEditor';
import { SocialSettings } from './social-tabs/SocialSettings';

export const initialTabs = {
  blocksTabs: [
    {
      id: 0,
      label: 'Building Blocks',
      name: 'build-blocks-tab',
      content: <BuildingBlocksList />,
    },
    {
      id: 1,
      label: 'Layout',
      name: 'layout-blocks-tab',
      content: <LayoutBlocksList />,
    },
    {
      id: 2,
      label: 'Settings',
      name: 'settings-blocks-tab',
      content: <SettingBlocks />,
    },
  ],
  orthographyTabs: [
    {
      id: 0,
      label: 'Contents',
      name: 'orthography-contents-tab',
      content: <MarkupEditor />,
    },
    {
      id: 1,
      label: 'Settings',
      name: 'orthography-settings-tab',
      content: <MarkupSettings />,
    },
  ],
  buttonTabs: [
    {
      id: 0,
      label: 'Contents',
      name: 'button-contents-tab',
      content: <ButtonEditor />,
    },
    {
      id: 1,
      label: 'Settings',
      name: 'button-settings-tab',
      content: <ButtonSettings />,
    },
  ],
  imageTabs: [
    {
      id: 0,
      label: 'Contents',
      name: 'image-contents-tab',
      content: <ImageEditor />,
    },
    {
      id: 1,
      label: 'Settings',
      name: 'image-settings-tab',
      content: <ImageSettings />,
    },
  ],
  spacingTabs: [
    {
      id: 0,
      label: 'Contents',
      name: 'spacing-contents-tab',
      content: <SpacingContent />,
    },
    {
      id: 1,
      label: 'Settings',
      name: 'spacing-settings-tab',
      content: <SpacingSettings />,
    },
  ],
  dividerTabs: [
    {
      id: 0,
      label: 'Contents',
      name: 'divider-contents-tab',
      content: <DividerEditor />,
    },
    {
      id: 1,
      label: 'Settings',
      name: 'divider-settings-tab',
      content: <DividerSettings />,
    },
  ],
  socialTabs: [
    {
      id: 0,
      label: 'Contents',
      name: 'social-contents-tab',
      content: <SocialEditor />,
    },
    {
      id: 1,
      label: 'Settings',
      name: 'social-settings-tab',
      content: <SocialSettings />,
    },
  ],
  htmlTabs: [
    {
      id: 0,
      label: 'Contents',
      name: 'html-contents-tab',
      content: <HtmlEditor />,
    },
    {
      id: 1,
      label: 'Settings',
      name: 'html-settings-tab',
      content: <HtmlEditor />,
    },
  ],
  footerTabs: [
    {
      id: 0,
      label: 'Contents',
      name: 'footer-contents-tab',
      content: <FooterEditor />,
    },
    {
      id: 1,
      label: 'Settings',
      name: 'footer-settings-tab',
      content: <FooterSettings />,
    },
  ],
  videoTabs: [
    {
      id: 0,
      label: 'Contents',
      name: 'video-contents-tab',
      content: <VideoEditor />,
    },
    {
      id: 1,
      label: 'Settings',
      name: 'video-settings-tab',
      content: <VideoSettings />,
    },
  ],
  giphyTabs: [
    {
      id: 0,
      label: 'Contents',
      name: 'giphy-contents-tab',
      content: <GiphyEditor />,
    },
    {
      id: 1,
      label: 'Settings',
      name: 'giphy-settings-tab',
      content: <GiphySettings />,
    },
  ],
};
