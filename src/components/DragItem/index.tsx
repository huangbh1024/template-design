import { useDraggable } from '@dnd-kit/core';
import { PropsWithChildren } from 'react';

interface Props {
  id: string;
  top: number;
  left: number;
}

export const DragItem = ({ top, left, id, children }: PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id
  });
  const style = { opacity: isDragging ? 0.5 : 1 };
  return (
    <div className="absolute z-2" ref={setNodeRef} style={{ ...style, top, left }} {...attributes} {...listeners}>
      {children}
    </div>
  );
};
