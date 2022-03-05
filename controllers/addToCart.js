const { Cart, Orders, Products, User } = require('../models')
const cuid = require('cuid')
const { validate } = require('../commonFunctions/reqValidation')

exports.addCarts = async (req, res) => {
    let total = 0
    const {
        cartItems
    } = req.body
    try {
        const userId = await User.findOne(
            {
                attributes: ['id']
            },
            {
                where: { uuid: cartItems[0].userId }
            })
        if (userId) {
            cartItems.forEach((element) => {
                element.userId = userId.id
            })
            await Cart.bulkCreate(cartItems, {
                fields: ["id", "productName", "productId", "totalPrice", "totalQuantity", "createdAt", "updatedAt", "userId"],
                updateOnDuplicate: ['productName', 'productId', 'totalPrice', 'totalQuantity', 'userId']
            })
                .then(data => {
                    data.map(items => {
                        total += items.totalPrice
                    })
                    res.json({
                        status: 'SUCCESS',
                        message: 'item added to cart',
                        data,
                        total
                    })
                }).catch(err => {
                    console.log("Error occured inside await", err)
                    res.json({
                        status: 'FAILED',
                        message: 'Couldnt complete'
                    })
                })
        } else {
            res.json({
                status: 'FAILED',
                message: 'Couldnt complete'
            })
        }
    } catch (err) {
        console.log("Error occured in add to cart try catch block", err)
        res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}

exports.proceedToCheckout = async (req, res) => {
    const {
        orderList
    } = req.body
    try {
        let allIds = []
        let uuid = orderList[0].userId
        const user = await User.findOne({
            where: { uuid: uuid }
        })
        orderList.map(items => {
            allIds.push(items.productId)
            items.userId = user.id
            items.status = 'Order placed.Get you soon!!'
        })
        const order = await Orders.bulkCreate(orderList, {
            fields: ['transactionId', 'productName', 'productId', 'totalPrice', 'totalQuantity', 'deliveryAddress', 'userId', 'status'],
            updateOnDuplicate: ['transactionId', 'productName', 'productId', 'totalPrice', 'totalQuantity', 'userId', 'deliveryAddress', 'status']
        })
        if (order) {
            const products = await Products.findAll(
                {
                    where: {
                        id: allIds
                    }
                })
            let updateQuantity = []
            if (products) {
                products.forEach(items => {
                    orderList.forEach(order => {
                        if (items.id == order.productId) {
                            let productList = {
                                id: items.id,
                                productName: items.productName,
                                description: items.description,
                                price: items.price,
                                quantity: parseInt(items.quantity) - parseInt(order.totalQuantity)
                            }
                            updateQuantity.push(productList)
                        }
                    })
                })
                const productUpadate = await Products.bulkCreate(updateQuantity, {
                    fields: ["id", "productName", "description", "price", "quantity", "createdAt", "updatedAt"],
                    updateOnDuplicate: ['id', 'productName', 'description', 'price', 'quantity']
                })
                console.log(productUpadate)
                if (productUpadate) {
                    const removeCart = await Cart.destroy({
                        where: {
                            productId: allIds
                        }
                    })
                    if (removeCart)
                        return res.json({
                            status: 'SUCCESS',
                            message: 'Order placed!!!'
                        })
                    res.json({
                        status: 'FAILED',
                        message: 'Internal server down'
                    })
                } else {
                    res.json({
                        status: 'FAILED',
                        message: 'Internal server down'
                    })
                }
            } else {
                res.json({
                    status: 'FAILED',
                    message: 'Internal server down'
                })
            }

        } else {
            res.json({
                status: 'FAILED',
                message: 'Internal server down'
            })
        }
    } catch (err) {
        console.log("Error inside Cart proceedTocheckout try catch block", err)
        res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}

exports.getAllCartItems = async (req, res) => {
    const {
        uuid
    } = req.body
    try {
        const userId = await User.findOne(
            {
                attributes: ['id']
            },
            {
                where: { uuid }
            })
        if (userId) {
            await Cart.findAll({
                where: { userId: userId.id }
            }).then(data => {
                const cartItems = data != '' ? data : 'Your cart is empty'
                res.json({
                    status: 'SUCCESS',
                    cartItems
                })
            }).catch(err => {
                console.log("Error in addToCart getAllCart", err)
                res.json({
                    status: 'FAILED',
                    message: 'Internal server down'
                })
            })
        } else {
            res.json({
                status: 'FAILED',
                message: 'Internal server down'
            })
        }
    } catch (err) {
        console.log("Error in addToCart getAllCart try catch block", err)
        res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}

exports.userOrderDetails = async (req, res) => {
    const { uuid } = req.body
    try {
        const user = await User.findOne({
            where: { uuid }
        })
        if (user)
            return await Orders.findAll({
                where: { userId: user.id }
            }).then(data => {
                res.json({
                    status: 'SUCCESS',
                    data
                })
            }).catch(err => {
                console.log("Error occured in user order details await", err)
                res.json({
                    status: 'FAILED',
                    message: 'Internal server down'
                })
            })
        res.json({
            status: 'FAILED',
            message: 'Internal server down'
        })
    } catch (err) {
        console.log("Error occured in user order details try catch block", err)
        res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}

exports.allOrderdetails = async (req, res) => {
    try {
        await Orders.findAll({
            attributes: { exclude: ['userId', 'id'] },
            include: [{ model: User }]
        }).then(data => {
            res.json({
                status: 'SUCCESS',
                data
            })
        }).catch(err => {
            console.log("Error in get all details try catch block", err)
            res.json({
                status: 'FAILED',
                message: 'Internal server down'
            })
        })
    } catch (err) {
        console.log("Error in all order details try catch block", err)
        res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}

exports.orderUpdates = async (req, res) => {
    const {
        uuid,
        status
    } = req.body
    try {
        const user = await User.findOne({ where: { uuid } })
        await Orders.update({ status }, {
            where: { userId: user.id }
        })
            .then(data => {
                console.log(data)
                res.json({
                    status: 'SUCCESS',
                    message: 'Order updated'
                })
            }).catch(err => {
                console.log("Error in all order details await", err)
                res.json({
                    status: 'FAILED',
                    message: 'Internal server down'
                })
            })
    } catch (err) {
        console.log("Error in all order details try catch block", err)
        res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}

