import styled from "styled-components";

interface YourProps {
  orientation?: string,
  clear? :boolean
}
export const DivCustom = styled.div`
&&& {
    float:  ${(p: YourProps) => p.orientation};
    clear: ${(p: YourProps) => p.clear? "both" : ""};
}`

