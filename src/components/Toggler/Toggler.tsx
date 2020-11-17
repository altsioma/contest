import styled from "@emotion/styled";
import React from "react";

export const TogglerGroup = styled.div`
  color: #43484b;
  padding: 9px 0;
  margin-top: -3px;
  margin-bottom: 14px;
  display: flex;
`;

const TogglerContainer = styled.button`
  align-items: center;
  border-width: 2px;
  border-style: solid;
  padding: 7px 20px;
  border-radius: 18px;
  cursor: pointer;
  position: relative;
  transition: all 200ms linear;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin: 8px 3px 0px;

  ${({ isActive }: TogglerState) =>
    isActive
      ? ` padding-left: 30px;
    padding-right: 10px;`
      : `background-color: transparent !important;`}
`;

const TogglerElement = styled.span`
  position: absolute;
  border-bottom: 2px solid #fff;
  border-left: 2px solid #fff;
  display: block;
  transform: rotate(-44deg);
  transition: border-color 200ms linear;
  width: 10px;
  height: 4px;
  left: 10px;
  top: 11px;
`;

type TogglerState = {
  isActive?: boolean;
};

type TogglerProps = {
  color?: string;
  label: string;
  onClick: (isActive: boolean) => void;
} & TogglerState;

export const Toggler: React.FC<TogglerProps> = ({
  color,
  isActive = false,
  label,
  onClick,
}) => {
  return (
    <TogglerContainer
      onClick={() => onClick(!isActive)}
      isActive={isActive}
      style={{
        borderColor: color,
        backgroundColor: color,
      }}
    >
      {isActive && <TogglerElement />}
      <span style={{ color: isActive ? "white" : color }}>{label}</span>
    </TogglerContainer>
  );
};
