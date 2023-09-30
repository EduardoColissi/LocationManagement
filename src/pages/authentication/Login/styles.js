import styled from "styled-components";

export const RightDiv = styled.div`
  height: 100%;
  width: 65%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: none;
  overflow-y: none;
  right: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const LeftDiv = styled.div`
  height: 100%;
  width: 35%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: none;
  overflow-y: none;
  left: 0;
`;

export const CenteredDiv = styled.div`
  width: 75%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
