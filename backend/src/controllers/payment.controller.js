import mercadopago from "mercadopago";
import { HOST, MERCADOPAGO_API_KEY } from "../config.js";

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY,
  });

  try {
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: "Factura de Agua",
          unit_price: 100,
          currency_id: "COL",
          quantity: 1,
        },
      ],
    
      back_urls: {
        success: `${HOST}/success`,
        pending: `${HOST}/pending`,
        failure: `${HOST}/failure`,
      },
      notification_url:"https://174c-152-200-176-70.ngrok.io/webhook ",   
    });

    // console.log(result);
    // res.json({ message: "Payment creted" });
    res.json(result.body);
  } catch (error) {
    return res.sendStatus(500).json({ message: "Something goes wrong" });
  }
};

export const receiveWebhook = async (req, res) => {
  const payment =  req.query;
    // console.log(payment);

  try {
    if (payment.type == "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);   
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
