export default function Input({ type, className, registerHook, labelName }) {
  return (
    <div className={`floating-group ${className}`}>
      <input
        type={type}
        id="name"
        name="name"
        // className={className}
        // required
        register={registerHook}
      />
      <label className="floating-label" htmlFor="name">
        {labelName}
      </label>
    </div>
  );
}
