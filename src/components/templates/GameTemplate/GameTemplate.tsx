import { FC, ReactNode } from 'react';
import Link from 'next/link'
import NavigationBar from '@components/molecules/NavigationBar/NavigationBar';
import MapTitle from '@components/atoms/MapTitle/MapTitle';
import Image from 'next/image';
import arrowURL from '../../../assets/img/arrow.png';

import './GameTemplate.scss';

export interface MakerTemplateProps {
  title: string
  children: ReactNode
  href: string
}
const GameTemplate: FC<MakerTemplateProps> = ({
  title,
  href,
  children
}) => {
  return (
    <>
      <div className="game-template">
        <NavigationBar>
          <Link href={href}>
            <Image src={arrowURL} alt="뒤로가기" />
          </Link>
        </NavigationBar>
        <MapTitle title={title} />
        {children}
      </div>
    </>
  );
};

export default GameTemplate;
