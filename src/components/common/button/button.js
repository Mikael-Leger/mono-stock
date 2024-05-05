import "./button.scss";

export default function Button({ color, bgColor, circle, outlined, size, side, icon, value, onClick }) {
  return (
    <div className={"button"
      + ((color) ? " color-" + color : "")
      + ((bgColor) ? " bgColor-" + bgColor : "")
      + ((circle) ? " circle" : "")
      + ((outlined) ? " outlined" : "")
      + ((size) ? " size-" + size : "")
      + ((side) ? " side-" + side : "")}>
      <button onClick={onClick}>
        { icon } { value }
      </button>
    </div>
  );
}
