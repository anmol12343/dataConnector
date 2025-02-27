const mongoose = require('mongoose');
const DropDownSchema = require('../model/formInputSchema');
const FormInputSchema = require("../model/formInputSchema");
const FormSchema = require("../model/formSchema")

exports.formController = async (req, res) => {
    try {
        let { form_name, formData } = req.body;

        // Validate request body
        if (!formData || !Array.isArray(formData)) {
            return res.status(400).json({
                success: false,
                message: "Invalid formData. It must be a non-empty array.",
            });
        }

        let inputFieldsId=[];

        for (let i = 0; i < formData.length; i++) {
            const inputField = await FormInputSchema.create({
                name: formData[i].name,
                placeholder: formData[i].placeholder,
                type: formData[i].type,
                minLen: formData[i].minLen,
                maxLen: formData[i].maxLen,
                minValue: formData[i].minValue,
                maxValue: formData[i].maxValue,
                regex: formData[i].regex,
                is_mandatory: formData[i].is_mandatory,
                visibility: formData[i].visibility,
                dropDown:formData[i].dropDown.options
            });
            inputFieldsId.push(inputField._id);
        }
        const form = await FormSchema.create({
            form_name,
            inputFields:inputFieldsId,
        });

          const formData1 = await FormSchema.find({}).populate("inputFields").exec();

        res.status(200).json({
            success: true,
            message: "Form Created Successfully",
            data: formData1,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create form",
            error: error.message,
        });
    }
};
