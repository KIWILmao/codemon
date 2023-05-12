const path = require("path")
const { connectDb } = require("./mongo")
const { ObjectId } = require("mongodb")
const express = require("express")

const app = express()
const PORT = 3000
app.use(express.json())
app.use(express.static(path.join(__dirname, "./assets")))

app.listen(PORT, () => {
  console.log(`server is listing to port ${PORT}... http://localhost:${PORT}`)
})

app.get("/api/product", async (req, res) => {
  try {
    const db = await connectDb()
    const products = await db.collection("products").find({}).toArray()
    res.status(200).send(products)
  } catch {
    res.status(404).send({ response: "failed" })
  }
})

app.get("/api/product/:id", async (req, res) => {
  const id = req.params.id
  try {
    var o_id = new ObjectId(id)
    const db = await connectDb()
    const product = await db.collection("products").findOne({ _id: o_id })
    console.log(product)
    res.status(200).send(product)
  } catch {
    return res.status(404).send({ response: "no product found with that id!!" })
  }
})

app.put("/api/product/:id", async (req, res) => {
  console.log(req.body)
  const id = req.params.id
  try {
    var o_id = new ObjectId(id)
    const db = await connectDb()
    const product = await db.collection("products").updateOne(
      { _id: o_id },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
        },
      }
    )
    res.status(200).send(product)
  } catch (err) {
    return res.status(404).send({ response: "no product found with that id!!" })
  }
})
