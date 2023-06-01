// eslint-disable-next-line react/prop-types
function Header(props) {
  const handleNewFile=(event)=>{
    props.readDataFromFile(event.target.files[0])
  }

  return (
    <div className={props.className}>
          <input type="file" className="hidden" id="file-upload" onChange={handleNewFile}></input>
      <label
        className="cursor-pointer bg-white border border-gray-300 text-black-700 py-2 px-4 rounded-lg shadow-sm  hover:bg-gray-100" htmlFor="file-upload">
        Seleccionar archivo
      </label>

    </div>
  );
}

export default Header;
