export const Film = ({ data }) => {
  return (
    <>
      <h1>{data.title}</h1>
      <div>
        {data.opening_crawl}
      </div>
    </>
  )
}