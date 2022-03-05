const { Products, Wishlist, User } = require('../models')
const { validate } = require('../commonFunctions/reqValidation')

exports.productAdding = async (req, res) => {
    const {
        productName,
        description,
        price,
        quantity,
        role
    } = req.body
    const isValid = validate(req.body)
    if (isValid) {
        if (!role || role !== 'Admin')
            return res.json({
                message: 'You are not authorized'
            })
        try {
            await Products.create({
                productName: productName,
                description: description,
                price: price,
                quantity
            })
                .then(result => {
                    return res.json({
                        status: 'SUCCESS',
                        message: 'Product is added',
                        result
                    })
                })
                .catch(err => {
                    console.log("Inside await=====>", err)
                    return res.json({
                        status: 'FAILED',
                        message: 'Couldnt complete'
                    })
                })
        }
        catch (err) {
            console.log("Inside try catch=====>", err)
            return res.json({
                status: 'FAILED',
                err
            })

        }
    }
    else {
        res.json({
            status: 'FAILED',
            message: 'Check your credentials!!!'
        })

    }
}

exports.productUpdate = async (req, res) => {
    const {
        productName,
        description,
        price,
        quantity,
        id
    } = req.body
    const isValid = validate(req.body)
    if (isValid) {
        try {
            const products = await Products.findOne({
                where: { id }
            })
            if (products) {
                let newQuantity = 0;
                newQuantity = parseInt(products.quantity) + parseInt(quantity)
                await Products.update({
                    productName,
                    description,
                    price,
                    quantity: newQuantity.toString()
                },
                    {
                        where: { id }
                    }).then(data => {
                        res.json({
                            status: 'SUCCESS',
                            message: 'Product updated',
                            data
                        })
                    }).catch(err => {
                        console.log("Error in product update try catch block", err)
                        res.json({
                            status: 'FAILED',
                            message: 'Internal server down'
                        })
                    })
            } else {
                res.json({
                    status: 'FAILED',
                    message: 'Remote server unreachable'
                })
            }
        } catch (err) {
            console.log("Error in product update try catch block", err)
            res.json({
                status: 'FAILED',
                message: 'Remote server unreachable'
            })
        }
    } else {
        res.json({
            status: 'FAILED',
            message: 'Check your credentials'
        })
    }

}

exports.getProducts = async (req, res) => {
    const { uuid } = req.body;
    try {
        if (isNaN(pages) || isNaN(limit))
            return res.send({
                message: 'Enter valid a valid count'
            })
        const products = await Products.findAndCountAll()
        if (products) {
            let user;
            if (uuid !== '' && uuid !== undefined ) {
                user = await User.findOne({
                    where: { uuid }
                })
            }
            let wishlisted;
            if (user) {
                wishlisted = await Wishlist.findAll({
                    where: { userId: user.id },
                    include: [{ model: Products }]
                })
                return res.json({
                    status: 'SUCCESS',
                    content: products.rows,
                    wishlists: wishlisted ? wishlisted : 'No wishlists added by the user'
                })
            } else {
                return res.json({
                    status: 'SUCCESS',
                    content: products.rows,
                    wishlists: wishlisted ? wishlisted : 'No wishlists added by the user'
                })
            }

        } else {
            console.log("Error inside if")
            return res.json({
                status: 'FAILED',
                message: 'couldnt not get!!'
            })
        }
    }
    catch (err) {
        console.log("error inside try catch====>", err)
        return res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}

exports.getSingleProduct = async (req, res) => {
    const { productId } = req.body
    try {
        await Products.findOne({
            where: { id: productId }
        })
            .then(data => {
                res.json({
                    status: 'SUCCESS',
                    data
                })
            }).catch(err => {
                console.log("Error inside try catch block", err)
                res.json({
                    status: 'FAILED',
                    message: 'Couldnt complete'
                })
            })
    } catch (err) {
        console.log("Error inside getSingleProduct", err)
        res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}

exports.productDelete = async (req, res) => {
    const { id } = req.body;
    try {
        await Products.destroy({
            where: { id }
        }).then(data => {
            res.json({
                status: 'SUCCESS',
                data,
                message: 'Product Removed'
            })
        }).catch(err => {
            console.log("Error in product delete await", err)
            res.json({
                status: 'SUCCESS',
                data,
                message: 'Product Removed'
            })
        })
    } catch (err) {
        console.log("Error ocuured in product delete try catch block", err)
        return res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}
