import "./button.scss"

export default function Button(props) {
  return (
    <div className={"button color-" + (props.color || 0) + ((props.circle) ? " circle" : "")}>
      <button onClick={props.onClick}>
        { props.icon }
      </button>
    </div>
  );
}
