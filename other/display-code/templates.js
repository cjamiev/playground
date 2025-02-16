const currentTranslationTest = `{
useEffect(() => {
  const getCoordinates = (event) => {
    setCoordinates ( { x: event.clientX, y: event.clientY } ) ;
  };

  addEventListener ( 'mousedown', getCoordinates ) ;

  return () => {
    removeEventListener ( 'mousedown', getCoordinates ) ;
  };
}, []);
}`;

module.exports = {
  currentTranslationTest
}