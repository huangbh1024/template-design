import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { DragEndEvent } from '@dnd-kit/core/dist/types';
import { Fragment, useEffect, useRef, useState } from 'react';
import { DragItem } from './components/DragItem';
import { DropWrapper } from './components/DropWrapper';
import { restrictToParentElement } from '@dnd-kit/modifiers';

function App() {
  const mouseSensor = useSensor(MouseSensor, {});
  const touchSensor = useSensor(TouchSensor, {});
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const [items, setItems] = useState<{ [key: string]: { top: number; left: number } }>({});
  const dropWrapperRef = useRef<HTMLDivElement>(null);
  const onDragEnd = (e: DragEndEvent) => {
    const { delta, over, active } = e;
    if (over && active.id === 'test1') {
      const uuid = window.crypto.randomUUID();
      // 计算在容器内的top 和 left
      setItems({ ...items, [uuid]: { top: delta.y - wrapperTop + 64, left: delta.x - wrapperLeft } });
      return;
    }
    if (active && items[active.id]) {
      const item = items[active.id];
      const top = item.top + delta.y;
      const left = item.left + delta.x;
      setItems({ ...items, [active.id]: { top, left } });
    }
  };

  const width = 1024;
  const height = 600;

  const [wrapperTop, setWrapperTop] = useState(0);
  const [wrapperLeft, setWrapperLeft] = useState(0);

  const handleResize = () => {
    setWrapperLeft(dropWrapperRef.current?.getBoundingClientRect().left ?? 0);
    setWrapperTop(dropWrapperRef.current?.getBoundingClientRect().top ?? 0);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-64px w-full"></div>
      <DndContext sensors={sensors} onDragEnd={onDragEnd} autoScroll={false}>
        <div className="flex-1 flex">
          <div className="w-200px h-full relative border">
            <DragItem top={0} left={0} id="test1">
              <div className="w-50px h-20px bg-red rounded-8px"></div>
            </DragItem>
            <DragOverlay dropAnimation={{ duration: 0 }}>
              <div className="w-50px h-20px bg-red rounded-8px"></div>
            </DragOverlay>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <DropWrapper ref={dropWrapperRef} className={`w-${width}px h-${height}px`}>
              <DndContext onDragEnd={onDragEnd} modifiers={[restrictToParentElement]}>
                {Object.keys(items).map((key) => (
                  <Fragment key={key}>
                    <DragItem id={key} top={items[key].top} left={items[key].left}>
                      <div className="w-50px h-20px bg-red rounded-8px"></div>
                    </DragItem>
                    <DragOverlay dropAnimation={{ duration: 0 }}>
                      <div className="w-50px h-20px bg-red rounded-8px"></div>
                    </DragOverlay>
                  </Fragment>
                ))}
              </DndContext>
            </DropWrapper>
          </div>
          <div className="w-200px h-full"></div>
        </div>
      </DndContext>
    </div>
  );
}

export default App;
