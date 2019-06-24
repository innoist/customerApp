import styled from "styled-components";

interface YourProps {
  orientation?: string;
  clear?: boolean;
  marginTop?: string;
  marginBottom?: string;
}
export const DivCustom = styled.div`
  &&& {
    float: ${(p: YourProps) => p.orientation};
    clear: ${(p: YourProps) => (p.clear ? "both" : "")};
    margin-top: ${(p: YourProps) => (p.marginTop ? p.marginTop : "")};
    margin-bottom: ${(p: YourProps) => (p.marginBottom ? p.marginBottom : "")};
  }
`;
