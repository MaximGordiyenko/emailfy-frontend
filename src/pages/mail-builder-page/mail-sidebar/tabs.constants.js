import { BuildingBlocksList } from './blocks-tabs/BuildingBlocksList.jsx';
import { LayoutBlocksList } from './blocks-tabs/LayoutBlocksList.jsx';
import { SettingBlocks } from './blocks-tabs/SettingBlocks.jsx';
import { MarkupEditor } from './text-tabs/markup-editor/MarkupEditor.jsx';
import { MarkupSettings } from './text-tabs/MarkupSettings.jsx';
import { ButtonEditor } from './button-tabs/ButtonEditor.jsx';
import { ImageEditor } from './image-tabs/ImageEditor.jsx';
import { ButtonSettings } from './button-tabs/ButtonSettings.jsx';
import { ImageSettings } from './image-tabs/ImageSettings.jsx';
import { HtmlEditor } from './html-tabs/HtmlEditor.jsx';
import { VideoEditor } from './video-tabs/VideoEditor.jsx';
import { GiphyEditor } from './giphy-tabs/GiphyEditor.jsx';
import { GiphySettings } from './giphy-tabs/GiphySettings.jsx';
import { FooterEditor } from './footer-tabs/FooterEditor.jsx';
import { FooterSettings } from './footer-tabs/FooterSettings.jsx';
import { SpacingContent } from './spacing-tabs/SpacingContent.jsx';
import { SpacingSettings } from './spacing-tabs/SpacingSettings.jsx';
import { DividerEditor } from './divider-tabs/DividerEditor.jsx';
import { DividerSettings } from './divider-tabs/DividerSettings.jsx';
import { SocialEditor } from './social-tabs/SocialEditor.jsx';
import { SocialSettings } from './social-tabs/SocialSettings.jsx';

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
      content: <VideoEditor />,
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
