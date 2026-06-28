import { useParams } from 'react-router-dom'

function PostDetail() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Post Detail</h1>
      <p className="text-gray-600">Viewing post with ID: {id}</p>
    </div>
  )
}

export default PostDetail