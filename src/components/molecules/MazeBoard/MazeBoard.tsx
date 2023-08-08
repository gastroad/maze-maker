import { FC } from 'react';

import MazeCell from '@components/atoms/MazeCell/MazeCell';
import { MazeBoardType } from '@type/maze';

import './MazeBoard.scss';

export interface MazeBoardProps extends MazeBoardType {
  height: number;
  handleMazeCellClick?: (col: number, row: number) => void;
}
const MazeBoard: FC<MazeBoardProps> = ({
  mazeData,
  start,
  end,
  height,
  resolvedPath,
  handleMazeCellClick = () => {},
}: MazeBoardProps) => {
  return (
    <div
      className="maze-board"
      style={{
        height: height,
        gridTemplateRows: `repeat(${mazeData.length}, 1fr)`,
      }}
    >
      {mazeData.map((col, i) => {
        return (
          <div
            key={`maze-${i}`}
            className="maze-board-col"
            style={{
              gridTemplateColumns: `repeat(${col.length}, 1fr)`,
            }}
          >
            {col.map((row, j) => {
              const isStartPoint = Boolean(start.x == i && start.y == j);
              const isEndPoint = Boolean(end.x == i && end.y == j);
              const isWall = Boolean(row === 1);
              const isResolvedPath = Boolean(
                resolvedPath?.filter((way) => way.x == i && way.y == j).length,
              );

              const type = isStartPoint
                ? 'start'
                : isEndPoint
                ? 'end'
                : isWall
                ? 'wall'
                : isResolvedPath
                ? 'resolve'
                : 'road';
              return (
                <MazeCell
                  key={`maze-${i}-${j}`}
                  type={type}
                  handleMazeCellClick={handleMazeCellClick}
                  col={i}
                  row={j}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MazeBoard;
