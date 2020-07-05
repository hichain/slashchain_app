import React from "react";
import { TileComponent } from "./tile";
import { GameState } from "../game";
import { Board } from "../board";
import { Cell, TileCell, Tile } from "../components";
import style from "../styles/board.module.scss";

export interface BoardProps {
  moves: any;
  G: GameState;
  pickedTile?: Tile;
}

export class BoardComponent extends React.Component<BoardProps> {
  private gameState = this.props.G;

  onClick(cell?: TileCell) {
    this.props.moves.clickCell(cell, this.props.pickedTile);
  }

  render() {
    const range = boardRange(this.gameState.board);
    const tbody = [];
    for (let x = range.minX; x <= range.maxX; x++) {
      let cells = [];
      for (let y = range.minY; y <= range.maxY; y++) {
        const key = `${x},${y}`;
        const cell = this.gameState.board.tile(new Cell(x, y));
        const classes = [style.cell];
        if (cell == null) {
          cells.push(<td className={classes.join(" ")} key={key} />);
          continue;
        }
        classes.push(style.available);
        let cellBody;
        if (cell.tile != null) {
          cellBody = <TileComponent tile={cell.tile} />;
        }
        cells.push(
          <td
            className={classes.join(" ")}
            key={key}
            onClick={() => this.onClick(cell)}
          >
            <div className={style.tile}>{cellBody}</div>
          </td>
        );
      }
      tbody.push(<tr key={x}>{cells}</tr>);
    }

    return (
      <div>
        <table className={style.board}>
          <tbody>{tbody}</tbody>
        </table>
      </div>
    );
  }
}

type BoardRange = { minX: number; maxX: number; minY: number; maxY: number };

const boardRange = (board: Board): BoardRange => {
  const xArray = board.tileCells.map((cell) => cell.x);
  const yArray = board.tileCells.map((cell) => cell.y);
  xArray.sort(numberSorter);
  yArray.sort(numberSorter);
  return {
    minX: xArray[0],
    maxX: xArray[xArray.length - 1],
    minY: yArray[0],
    maxY: yArray[yArray.length - 1],
  };
};

const numberSorter = (a: number, b: number): number => a - b;
