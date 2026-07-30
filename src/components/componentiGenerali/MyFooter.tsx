const MyFooter = function () {
  const today = new Date();
  return (
    <div className="blu-mare">
      <p className="m-0 py-3 text-center text-white">
        Mattinata - {today.getFullYear()} - {today.toLocaleTimeString()}
      </p>
    </div>
  );
};

export default MyFooter;
