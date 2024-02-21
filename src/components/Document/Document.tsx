import HotkeyFocusBlock from "../FocusGroup/FocusGroup";

interface DocumentProps {}

function Document({}: DocumentProps) {
  return (
    <>
      <HotkeyFocusBlock key="a">Test "a"</HotkeyFocusBlock>
      <HotkeyFocusBlock key="b">Test "b"</HotkeyFocusBlock>
      <HotkeyFocusBlock key="cb">Test "d"</HotkeyFocusBlock>
    </>
  );
}

export default Document;
