import DOMPurify from 'dompurify';
import { Html, Head, Body, Container, Row, Column, Link } from '@react-email/components';

import * as builderScript from '../pages/mail-builder-page/builder-script/builderScript';

import { InstagramIcon } from '../components/mail-block-icons/InstagramIcon';
import { TwitterIcon } from '../components/mail-block-icons/TwitterIcon';
import { FacebookIcon } from '../components/mail-block-icons/FacebookIcon';
import { LinkedIn } from '../components/mail-block-icons/LinkedIn';
import { BrandLogoIcon } from '../components/mail-block-icons/BrandLogoIcon';
import { BrandLogoText } from '../components/mail-block-icons/BrandLogoText';

import { ButtonOfPlayer } from './ButtonOfPlayer';

const WORKSPACE_EDITOR_STYLES = { overflow: 'auto' };
const MAIL_EDITOR_STYLES = {
  margin: '10px auto',
  padding: '20px',
  borderRadius: '5px',
  maxWidth: '600px',
};
const EDITOR_BLOCK_STYLES = { margin: '5px 0', textAlign: 'center' };
const LAYOUT_CHILD_STYLES = { textAlign: 'center', padding: '0 5px' };
const BUTTON_STYLES = {
  background: '#7e9d00',
  color: '#fafafa',
  border: 'none',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '200px',
  height: '30px',
};
const IMAGE_STYLES = { padding: 0, width: '100%' };
const SPACING_STYLE = { height: 20 };
const DIVIDER_STYLES = {
  borderRadius: '5px',
  margin: '10px 0',
  cursor: 'pointer',
  border: '1px solid #C0C0C5',
};
const SOCIAL_STYLES = {};
const HTML_STYLES = { border: 'none' };
const FOOTER_STYLES = {
  background: '#2A2B3B',
  padding: '18px 0',
};
const VIDEO_STYLES = {
  width: '100%',
  display: 'block',
  boxSizing: 'border-box',
  height: `100%`,
  position: 'relative',
  backgroundSize: 'cover',
};
const GIPHY_STYLES = { padding: 0, width: '100%' };

const MailText = ({ text, style }) => {
  return <span style={style} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />;
};
const MailHeading = ({ text, style }) => {
  return <span style={style} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />;
};
const MailList = ({ text, style }) => (
  <span style={style} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
);
const MailButton = ({ text, style }) => (
  <button style={{ ...BUTTON_STYLES, ...style }}>{text}</button>
);
const MailImage = ({ url, style }) => (
  <img src={`${url}`} alt={`${url}`} style={{ ...IMAGE_STYLES, ...style }} />
);

const MailSpacing = ({ style }) => <div style={{ ...SPACING_STYLE, ...style }} />;
const MailDivider = ({ style }) => <hr style={{ ...DIVIDER_STYLES, ...style }} />;
const MailSocial = ({ style }) => (
  <div style={{ ...SOCIAL_STYLES, ...style }}>
    <Link to="#">
      <InstagramIcon />
    </Link>
    <Link to="#">
      <TwitterIcon />
    </Link>
    <Link to="#">
      <FacebookIcon />
    </Link>
    <Link to="#">
      <LinkedIn />
    </Link>
  </div>
);
const MailHtml = ({ text, style }) => (
  <code
    style={{ ...HTML_STYLES, ...style }}
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(text),
    }}
  />
);
const MailFooter = ({ text, style }) => (
  <Container style={{ ...FOOTER_STYLES, ...style }}>
    <Row className="logos-wrapper">
      <Column className="logos-container">
        <BrandLogoIcon />
        <BrandLogoText />
      </Column>
    </Row>
    <Row>
      <Link
        className="unsubscribe-link"
        to="#"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(text),
        }}
      />
    </Row>
  </Container>
);
const MailVideo = ({ url, video, style }) => {
  const { width, height, ...styles } = style;
  const ratio = height / width;
  return (
    <Row>
      <Column align="center" valign="middle">
        <a
          href={video}
          target="_blank"
          rel="noreferrer"
          style={{
            ...VIDEO_STYLES,
            ...styles,
            backgroundImage: `url("${url}")`,
            paddingTop: `calc(${50}% * ${ratio} - 28px)`,
            paddingBottom: `calc(${50}% * ${ratio} - 28px)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          <ButtonOfPlayer />
        </a>
      </Column>
    </Row>
  );
};
const MailGiphy = ({ url, style }) => {
  return <img src={`${url}`} alt={`${url}`} style={{ ...GIPHY_STYLES, ...style }} />;
};

const componentMapping = {
  paragraph_block: MailText,
  heading_block: MailHeading,
  list_block: MailList,
  button_block: MailButton,
  image_block: MailImage,
  spacing_block: MailSpacing,
  divider_block: MailDivider,
  social_block: MailSocial,
  html_block: MailHtml,
  footer_block: MailFooter,
  video_video: MailVideo,
  giphy_block: MailGiphy,
};

const TypeResolverComponent = ({ item }) => {
  const Component = componentMapping[item.type];
  if (Component) {
    return <Component {...item} {...item.params} item={item} />;
  }
  return <item.content {...item} {...item.params} mode={'final'} />;
};

const RecursiveMailBlockTemplate = ({ item }) => {
  if (item?.type?.startsWith('layout') || item?.type?.startsWith('icon-block')) {
    return (
      <Row key={item.id} style={EDITOR_BLOCK_STYLES}>
        {item?.params?.child?.map((childItem, idx) => {
          return (
            <Column key={childItem?.id} style={{ ...LAYOUT_CHILD_STYLES, width: item.width[idx] }}>
              {childItem?.children?.map((nestedChild) => (
                <TypeResolverComponent key={nestedChild?.id} item={nestedChild} />
              ))}
            </Column>
          );
        })}
      </Row>
    );
  }
  return (
    <Row style={EDITOR_BLOCK_STYLES}>
      <Column>
        <TypeResolverComponent key={item.id} item={item} />
      </Column>
    </Row>
  );
};

export const MailEditorToHTML = ({ mailEditorState }) => {
  const script = JSON.parse(JSON.stringify(mailEditorState));
  return builderScript
    ?.initBlock(script)
    ?.map((item) => <RecursiveMailBlockTemplate key={item.id} item={item} />);
};

export const RootHtml = ({ children }) => (
  <Html>
    <Head>
      <title>Emailfy | Marketing</title>
      <style>{``}</style>
    </Head>
    <Body style={WORKSPACE_EDITOR_STYLES}>
      <Container style={MAIL_EDITOR_STYLES}>{children}</Container>
    </Body>
  </Html>
);
