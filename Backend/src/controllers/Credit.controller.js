
var creditModel = require("../models/Credit");


const creditCtrl = {};
creditCtrl.getCredits = async (req, res) => {
  const credits = await creditModel.find();
  res.json(credits);
};
creditCtrl.createCredit = async (req, res) => {
  const {
    CC,
    name,
    lastname,
    letterurl,
    permissurl,
    credit,
    total,
    valueCuote,
    cuotes,
    sellername,
    contactsell,
  } = req.body;
  const newCredit = new creditModel({
    CC: CC,
    name: name,
    lastname: lastname,
    letterurl: letterurl,
    permissurl: permissurl,
    credit: credit,
    total: total,
    valueCuote: valueCuote,
    cuotes: cuotes,
    sellername: sellername,
    contactsell: contactsell,
  });
  await newCredit.save();
  res.json("Credit Save");
  console.log(req.body)
};
creditCtrl.getCredit = async (req, res) => {
  const credit = await creditModel.findById(req.params.id);
  res.json(credit);
};
creditCtrl.updateCredit = async (req, res) => {
  const {
    CC,
    name,
    lastname,
    credit,
    total,
    valueCuote,
    cuotes,
    sellername,
    contactsell,
  } = req.body;
  const newCredit = await creditModel.findByIdAndUpdate(req.params.id, {
    CC: CC,
    name: name,
    lastname: lastname,
    credit: credit,
    total: total,
    valueCuote: valueCuote,
    cuotes: cuotes,
    sellername: sellername,
    contactsell: contactsell,
  });
  newCredit.save();
  res.json("Credit Updated");
};
creditCtrl.deleteCredit = async (req, res) => {
  await creditModel.findByIdAndDelete(req.params.id);
  res.json("Credit Deleted");
};
creditCtrl.updateValue = async (req, res) => {
  await creditModel.findByIdAndUpdate(
    req.params.id,
    {
      cuotes: req.body.cuotes
    },
    {
      new: true,
    }
  );

  res.send("Credito actualizado");
}

module.exports = creditCtrl;
