import React, { useState, useEffect } from "react";

function Selector(props) {
  const { data, init } = props;
  const [selected, setSelected] = useState(null);
  const [dropSelector, setDropSelector] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setDropSelector(false);
    });
  }, []);
  //console.log(props.selected)
  return (
    <button
      className="item newCleanBtn cstm-slt flex aic rel p-0"
      onClick={(e) => {
        e.stopPropagation();
        setDropSelector(!dropSelector);
        props.setSelector({ type: props.type, dropSelector: !dropSelector });
      }}
    >
      {props.selected == null && (
        <div className="iput flex aic">
          <div className="mr-2 icon-chevron-down c000" />
          <div className="c000">Select</div>
        </div>
      )}
      {data.map(
        (item) =>
          props.selected == item.label && (
            <div className="iput flex aic">
              <div className="mr-2 icon-chevron-down c000" />
              <div className="c000">{item.label}</div>
            </div>
          )
      )}
      {props.activeselector.type === props.type &&
        props.activeselector.dropSelector === true &&
        dropSelector && (
          <div className="options flex flex-col abs">
            {data.map((item) => (
              <button
                className="newCleanBtn item flex aic anim"
                onClick={() => {
                  setSelected(item.label);
                  props.onchange(item.label);
                  setDropSelector(false);
                }}
              >
                <div className="c000">{item.label}</div>
              </button>
            ))}
          </div>
        )}
    </button>
  );
}

export default Selector;
