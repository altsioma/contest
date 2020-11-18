/* istanbul ignore file */
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { withDraggable } from "./withDraggable";
import { RangePosititon } from "@/types/range";

export type HandlerModifier = {
  isLeft?: boolean;
  isNight?: boolean;
};

const RangeContainer = styled.div`
  position: relative;
  height: 54px;
  padding: 2px 0px;
  max-height: 10vh;
  border-radius: 9px;
  transition: opacity 0.5s, transform 0.5s;
`;

const RangePreviewContainer = styled.div`
  width: 100%;
  transform-origin: top left;
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 0;
`;

export const RangeMask = styled.div`
  pointer-events: none;
  background: ${({ isNight }: HandlerModifier) =>
    isNight ? `rgba(48, 66, 89, 0.6)` : `rgba(226, 238, 249, 0.6)`};
  position: absolute;
  top: 2px;
  bottom: 2px;
  box-sizing: content-box;
  ${({ isLeft }: HandlerModifier) =>
    isLeft
      ? `border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    `
      : ` border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    right: 0px;`}
`;

export const RangeWindow = styled.div`
  position: absolute;
  top: 0px;
  height: 100%;
  cursor: move;
  cursor: grab;
  transition: opacity 0.3s;
  &:before {
    background: ${({ isNight }: HandlerModifier) =>
      isNight ? `#56626D` : `#c0d1e1`};
    content: "";
    position: absolute;
    left: 14px;
    right: 14px;
    height: 2px;
    z-index: 100;
    top: 0px;
  }
  &:after {
    background: ${({ isNight }: HandlerModifier) =>
      isNight ? `#56626D` : `#c0d1e1`};
    content: "";
    position: absolute;
    left: 14px;
    right: 14px;
    height: 2px;
    z-index: 100;
    bottom: 0px;
  }
`;

export const RangeHanlder = styled.div`
  background: ${({ isNight }: HandlerModifier) =>
    isNight ? `#56626D` : `#c0d1e1`};
  position: absolute;
  width: 14px;
  top: 0px;
  bottom: 0px;
  cursor: ew-resize;
  z-index: 1;
  ${({ isLeft }: HandlerModifier) =>
    isLeft
      ? `left: 0px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;`
      : `right: 0px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;`}
  &:before {
    content: "";
    position: absolute;
    background: #ffffff;
    width: 2px;
    height: 14px;
    border-radius: 4px;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    margin: auto;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    cursor: inherit;
    ${({ isLeft }: HandlerModifier) =>
      isLeft
        ? `left: -6px;
      right: -4px;`
        : `left: -4px;
      right: -6px;`}
  }
`;

export type DraggableArea = {
  min: number;
  max: number;
  width: number;
};

interface Props {
  position: RangePosititon;
  setPosition: (e: RangePosititon) => void;
  minRange?: number;
  isNight?: boolean;
}

export const RangeSelector: React.FC<Props> = ({
  children,
  position,
  setPosition,
  minRange = 55,
  isNight = false,
}) => {
  const [draggableArea, setArea] = useState<DraggableArea>({
    min: 0,
    max: 0,
    width: 0,
  });
  const containerRef = useRef(null);
  useEffect(() => {
    const ref = containerRef.current;
    if (ref) {
      const { x, width } = (ref as HTMLDivElement).getBoundingClientRect();
      setArea({ min: x, max: x + width, width });
    }
  }, []);

  const handleLeftMovie = (newPosition: number) => {
    const currentPosition = position.left + newPosition;
    if (
      currentPosition >= 0 &&
      draggableArea.width - (currentPosition + position.right) > minRange
    ) {
      setPosition({ ...position, left: currentPosition });
    }
  };

  const handleRightMovie = (newPosition: number) => {
    const currentPosition = position.right - newPosition;
    if (
      currentPosition >= 0 &&
      draggableArea.width - (currentPosition + position.left) > minRange
    ) {
      setPosition({ ...position, right: currentPosition });
    }
  };

  const handleWindow = (newPosition: number) => {
    const left = position.left + newPosition;
    const right = position.right - newPosition;
    if (left > 0 && right > 0) {
      setPosition({
        left: position.left + newPosition,
        right: position.right - newPosition,
      });
    }
  };

  const LeftHandler = withDraggable(RangeHanlder, handleLeftMovie);
  const RightHandler = withDraggable(RangeHanlder, handleRightMovie);
  const RangeWindowMovie = withDraggable(RangeWindow, handleWindow);

  return (
    <RangeContainer ref={containerRef}>
      <RangePreviewContainer>{children}</RangePreviewContainer>
      <RangeMask style={{ width: position.left }} isLeft isNight={isNight} />
      <RangeMask style={{ width: position.right }} isNight={isNight} />
      <RangeWindowMovie
        isNight={isNight}
        style={{ left: position.left, right: position.right }}
      >
        <LeftHandler isNight={isNight} isLeft></LeftHandler>
        <RightHandler isNight={isNight}></RightHandler>
      </RangeWindowMovie>
    </RangeContainer>
  );
};
