import { Typography, TypographyProps } from "@mui/material";
import { keyframes, styled } from "@mui/material/styles/";

const strobe = keyframes`
  0% {
    color: #ffa7c4;
  } 
  14.28% {
    color: #ffb6ce;
  }
  28.56% {
    color: #ffccda;
  }
  42.84% {
    color: #ffdce1;
  }
  57.12% {
    color: #dce1ff;
  }
  71.4% {
    color: #c7b9ff;
  }
  85.68% {
    color: #b08cff;
  }
  100% {
    color: #9b61ff;
  }
`;

const BaseTitle = styled(Typography)({
    animation: `${strobe} 2000ms linear infinite`,
});


interface RainbowTitleProps {
    text: string;
    variant: TypographyProps["variant"];
  }
  

const RainbowTitle = ({ text, variant = "h1" }: RainbowTitleProps) => {
  return (
    <BaseTitle padding={1} variant={variant}>
      {text}
    </BaseTitle>
  );
};

export default RainbowTitle;
