import { DesktopIcon } from '../DesktopIcon';
import { MobileIcon } from '../MobileIcon';
import { useMainContext } from '../../../context/MainContext';

export const DesktopMobileIcon = () => {
  const { mediaQuery, setMediaQuery } = useMainContext();

  const isDesktopMode = mediaQuery === '70%' ? ' is-desktop' : '';
  const isMobileMode = mediaQuery === '33%' ? ' is-mobile' : '';

  return (
    <>
      <DesktopIcon className={`${isDesktopMode}`} onClick={() => setMediaQuery('70%')} />
      <MobileIcon className={`${isMobileMode}`} onClick={() => setMediaQuery('33%')} />
    </>
  );
};
