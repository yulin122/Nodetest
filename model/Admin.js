var mongoose=require('mongoose')
var Schema=mongoose.Schema;
//var dateformat=require('dateformat');
var bcrypt=require('bcrypt-nodejs');
var AdminSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
})

AdminSchema.pre('save',function(next){
  this.password=bcrypt.hashSync(this.password,bcrypt.genSaltSync(8),null);
  next();

});
AdminSchema.statics.compare=function(cleartext,encrypted){
  return bcrypt.compareSync(cleartext,encrypted);

}
module.exports = mongoose.model('Admin',AdminSchema)
