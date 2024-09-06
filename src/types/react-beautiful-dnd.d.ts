// src/react-beautiful-dnd.d.ts
declare module 'react-beautiful-dnd' {
  import * as React from 'react';

  export interface DropResult {
    draggableId: string;
    type: string;
    source: {
      index: number;
      droppableId: string;
    };
    destination?: {
      droppableId: string;
      index: number;
    };
  }

  export interface DraggableLocation {
    droppableId: string;
    index: number;
  }

  export interface DraggableProvided {
    draggableProps: React.HTMLProps<HTMLDivElement>;
    dragHandleProps: React.HTMLProps<HTMLDivElement> | null;
    innerRef: (element?: HTMLElement | null) => any;
  }

  export interface DroppableProvided {
    droppableProps: React.HTMLProps<HTMLDivElement>;
    innerRef: (element?: HTMLElement | null) => any;
    placeholder: React.ReactElement | null;
  }

  export interface DraggableProps {
    draggableId: string;
    index: number;
    children: (provided: DraggableProvided) => React.ReactElement;
  }

  export interface DroppableProps {
    droppableId: string;
    children: (provided: DroppableProvided) => React.ReactElement;
  }

  export class DragDropContext extends React.Component<React.PropsWithChildren<{ onDragEnd(result: DropResult): void }>> {}
  export class Droppable extends React.Component<DroppableProps> {}
  export class Draggable extends React.Component<DraggableProps> {}
}
