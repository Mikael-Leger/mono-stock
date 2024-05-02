import "./button.scss"

export default function Button(props) {
  return (
    <div className={"button"
      + ((props.color) ? " color-" + props.color : "")
      + ((props.bgColor) ? " bgColor-" + props.bgColor : "")
      + ((props.circle) ? " circle" : "")
      + ((props.outlined) ? " outlined" : "")
      + ((props.size) ? " size-" + props.size : "")
      + ((props.side) ? " side-" + props.side : "")}>
      <button onClick={props.onClick}>
        { props.icon } { props.value }
      </button>
    </div>
  );
}
