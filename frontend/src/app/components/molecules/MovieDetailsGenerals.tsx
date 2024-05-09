interface MovieDetailesGenerals {
  originalLanguqge: string;
  status: string;
  budget: number;
  revenue: number;
}

function MovieDetailesGenerals(props: MovieDetailesGenerals) {
  return (
    <div className="w-full">
      <h1 className="font-black text-2xl text-dark-blue mb-5">General</h1>
      <div className="flex space-x-10">
        <div>
          <h1 className="font-black text-dark-blue">Status</h1>
          <p>{props.status}</p>
        </div>

        <div>
          <h1 className="font-black text-dark-blue">Original Language</h1>
          <p>{props.originalLanguqge}</p>
        </div>

        <div>
          <h1 className="font-black text-dark-blue">Budget</h1>
          <p>{props.budget}</p>
        </div>

        <div>
          <h1 className="font-black text-dark-blue">Revenue</h1>
          <p>{props.revenue}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailesGenerals;
