type buttonProps = {
  testid: string;
  buttonText: string;
  isDisabled?: boolean;
  propsStyle?: string;
  onClickHandler?: (params?: any) => void;
};

export default function CustomButton({
  testid,
  isDisabled = false,
  buttonText,
  propsStyle = "",
  onClickHandler,
}: buttonProps) {
  return (
    <button
      data-testid={testid}
      disabled={isDisabled}
      onClick={onClickHandler}
      className={propsStyle}
    >
      {buttonText}
    </button>
  );
}
