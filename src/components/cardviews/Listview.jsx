import { Image, Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const Listview = () => {
    const { items } = useSelector((state) => state.cartInfo)
    return (

        <Table borderless responsive>
            <tbody>
                {items.map(item => (
                    <tr key={item._id} className="align-middle py-4 border-bottom">
                        <td style={{ width: '100px' }}>
                            <Image src={item.coverImage} alt={item.title} fluid thumbnail />
                        </td>
                        <td>
                            <h5 className="mb-1">{item.title}</h5>
                            <div className="text-muted mb-1">by {item.author}</div>
                            <div className="text-muted mb-1">Category: {item.category}</div>
                            <div className="text-success mb-2">{item.status}</div>

                            <div className="d-flex align-items-center mb-2">
                                <Button
                                    variant="light"
                                    size="sm"
                                    onClick={() => dispatch(removeFromCart(item.bookId))}
                                >
                                    <FaTrash />
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="mx-2"
                                    onClick={() => dispatch(decrementQuantity(item.bookId))}
                                >
                                    <AiOutlineMinus />
                                </Button>
                                <span>{item.quantity}</span>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="mx-2"
                                    onClick={() => dispatch(incrementQuantity(item.bookId))}
                                >
                                    <AiOutlinePlus />
                                </Button>

                            </div>
                        </td>


                    </tr>

                ))}
            </tbody>
        </Table>

    )
}

export default Listview