import { useDroppable } from '@dnd-kit/core';
import classNames from 'classnames';
import { HTMLProps, PropsWithChildren, forwardRef } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {}
export const DropWrapper = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(({ children, className }, ref) => {
  const { isOver, setNodeRef } = useDroppable({ id: 'droppable' });

  return (
    <div ref={ref} className={className}>
      <div
        ref={setNodeRef}
        className={classNames(['border bg-#eee rounded-10px relative w-full h-full', isOver && 'border-red'])}
      >
        {children}
      </div>
    </div>
  );
});
