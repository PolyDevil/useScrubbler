# useScrubbler

![useScrubbler example](https://user-images.githubusercontent.com/25101758/111726070-4251a780-8879-11eb-90c9-7b1c2ff8b85d.gif)

1. Include this style:
```
body.scrubbling {
  cursor: ew-resize;
}

body.scrubbling > * {
  pointer-events: none;
}
```

2. In react component:
```
    const { value, onChange, onMouseDown } = useScrubbler({
        value: 10,
        min: -50,
        max: 50,
        isInteger: false,
        toFixed: 1,
        step: 0.5,
        className: 'scrubbling',
    });

    const handleChange = useCallback(
        ({ target: { value: v } }: React.ChangeEvent<HTMLInputElement>) => {
            onChange(v);
        },
        [onChange],
    );

    // jsx

    <label>
        <span onMouseDown={onMouseDown}>Drag me</span>
        <input value={value} onChange={handleChange} />
    </label>

```
