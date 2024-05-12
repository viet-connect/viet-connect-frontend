import styled, { CSSObject, css } from 'styled-components';

interface Option {
  value: string;
  label: string;
}

export default function RadioBox(props) {
  const { value, options, column, color, onChange } = props;
  const multiple = Array.isArray(value);
  const onBoxClick = (selectedValue) => {
    let newValue = multiple ? [] : '';
    if (multiple) {
      if (value.includes(selectedValue)) newValue = value.filter((v) => v !== selectedValue);
      else newValue = [...value, selectedValue];
    } else if (value === selectedValue) newValue = null;
    else newValue = selectedValue;
    onChange(newValue);
  };
  return (
    <Container className="radio-box" $length={options.length} $column={column}>
      {options.map(({ value: optionValue, label }, i) => {
        const selected = multiple ? value.includes(optionValue) : value === optionValue;
        const isFirst = i === 0;
        const isLast = i === options.length - 1;
        return (
          <OptionBox
            key={i}
            $selected={selected}
            $firstBox={isFirst}
            $lastBox={isLast}
            $column={column}
            $color={color}
            onClick={() => onBoxClick(optionValue)}
          >
            {label}
          </OptionBox>
        );
      })}
    </Container>
  );
}

interface ContainerProps {
  $length: number;
  $column: boolean;
}

const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: ${({ $length, $column }) => `repeat(${$column ? 1 : $length}, 1fr)`};
  justify-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
`;

interface OptionBoxProps {
  $selected: boolean;
  $firstBox: boolean;
  $lastBox: boolean;
  $column: boolean;
  $color?: string;
}

const OptionBox = styled.div<OptionBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 14px;
  cursor: pointer;
  ${({ $selected, $firstBox, $lastBox, $column, $color }) => {
    const cssProps = {} as CSSObject;
    if ($column) cssProps.borderTop = '1px solid #d9d9d9';
    else cssProps.borderLeft = '1px solid #d9d9d9';

    if ($firstBox) {
      cssProps.border = 'none';
      cssProps.borderTopLeftRadius = '10px';

      if ($column) cssProps.borderTopRightRadius = '10px';
      else cssProps.borderBottomLeftRadius = '10px';
    } else if ($lastBox) {
      cssProps.borderBottomRightRadius = '10px';

      if ($column) cssProps.borderBottomLeftRadius = '10px';
      else cssProps.borderTopRightRadius = '10px';
    }

    if ($selected) {
      cssProps.backgroundColor = $color ?? 'rgba(68, 142, 247, 0.2)';
    }
    return css(cssProps);
  }}

  &:hover {
    background-color: ${({ $selected, $color }) => ($selected ? $color : 'white')};
  }
`;
