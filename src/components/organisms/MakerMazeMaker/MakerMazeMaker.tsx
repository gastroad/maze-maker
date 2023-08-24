'use client';
import { FC, useEffect } from 'react';

import MazeBoard from '@components/molecules/MazeBoard';
import useResponsiveHeight from 'src/hooks/useResponsiveHeight';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  mazeState,
  currentTypeState,
  mazeDataState,
  resolvedPathState,
  startEndState,
} from 'src/state/maker/atoms';

import './MakerMazeMaker.scss';
import { MazeDataType, MazeSizeType } from '@type/maze';

export interface MakerMazeMakerProps {}
const MakerMazeMaker: FC<MakerMazeMakerProps> = () => {
  const [mazeData, setMazeData] = useRecoilState(mazeDataState);
  const [startEnd, setStartEnd] = useRecoilState(startEndState);
  const maze = useRecoilValue(mazeState);
  const currentType = useRecoilValue(currentTypeState);
  const resolvedPath = useRecoilValue(resolvedPathState);

  useEffect(() => {
    const mazeData = new Array(maze.mazeSize.col).fill(0).map(() => {
      return new Array(maze.mazeSize.row).fill(0);
    });
    setMazeData(mazeData);
  }, [maze.mazeSize]);

  const handleMazeCellClick = ({ col, row }: MazeSizeType) => {
    let nextMazeData: MazeDataType;
    switch (currentType) {
      case 'start':
      case 'end':
        setStartEnd({ ...startEnd, [currentType]: { x: col, y: row } });
        return;
      case 'wall':
      case 'road':
        nextMazeData = mazeData.map((cell, i) =>
          i === col
            ? cell.map((value, j) =>
                j === row ? (currentType === 'wall' ? 1 : 0) : value,
              )
            : cell,
        );
        setMazeData(nextMazeData);
        return;
    }
  };

  const { elementRef, height } = useResponsiveHeight(0, 1, 1);
  return (
    <div className="maze-maker" style={{ height: height }} ref={elementRef}>
      <MazeBoard
        mazeData={mazeData}
        start={startEnd.start}
        end={startEnd.end}
        height={height}
        resolvedPath={resolvedPath}
        handleMazeCellClick={handleMazeCellClick}
      />
    </div>
  );
};
export default MakerMazeMaker;
