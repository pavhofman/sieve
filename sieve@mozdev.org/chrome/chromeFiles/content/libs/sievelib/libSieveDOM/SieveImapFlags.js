
// setflag <variablename: string> <list-of-flags: string-list>


function SieveSetFlag(id) 
{
  this.id = id;
  this.whiteSpace 
    = new Array(new SieveDeadCode(this.id+"_0"),
                new SieveDeadCode(this.id+"_2"));  
                
  this.flaglist = new SieveStringList(this.id+"_1");
}

SieveSetFlag.prototype.parse
    = function (data)
{
  // Syntax :
  
  data = data.slice("setflag".length);
  
  // ... eat the deadcode before the string...
  data = this.whiteSpace[0].parse(data);
      
  data = this.flaglist.parse(data)

  data = this.whiteSpace[1].parse(data);
    
  // ... and finally remove the semicolon;
  if (isSieveSemicolon(data) == false)
    throw "Syntaxerror: Semicolon expected";
    
  return data.slice(1);
}

SieveSetFlag.prototype.getID
    = function ()
{
  return this.id;
}

SieveSetFlag.prototype.toString
    = function ()
{
  return "setflag"
    + this.whiteSpace[0].toString()
    + this.flaglist
    + this.whiteSpace[1].toString()        
    + ";";
}

SieveSetFlag.prototype.toXUL
    = function ()
{
  return "Set Flag";
}

/******************************************************************************/

//addflag <variablename: string> <list-of-flags: string-list>

function SieveAddFlag(id) 
{
  this.id = id;
  this.whiteSpace 
    = new Array(new SieveDeadCode(this.id+"_0"),
                new SieveDeadCode(this.id+"_2"));  
                
  this.flaglist = new SieveStringList(this.id+"_1");
}

SieveAddFlag.prototype.parse
    = function (data)
{
  // Syntax :
  // <"fileinto"> <string> <";">
  
  data = data.slice("addflag".length);
  
  // ... eat the deadcode before the string...
  data = this.whiteSpace[0].parse(data);
  
  data = this.flaglist.parse(data)

  data = this.whiteSpace[1].parse(data);
    
  // ... and finally remove the semicolon;
  if (isSieveSemicolon(data) == false)
    throw "Syntaxerror: Semicolon expected";
    
  return data.slice(1);
}

SieveAddFlag.prototype.getID
    = function ()
{
  return this.id;
}

SieveAddFlag.prototype.toString
    = function ()
{
  return "addflag"
    + this.whiteSpace[0].toString()
    + this.flaglist
    + this.whiteSpace[1].toString()        
    + ";";
}

SieveAddFlag.prototype.toXUL
    = function ()
{
  return "Add Flag";
}

/******************************************************************************/

//removeflag <variablename: string> <list-of-flags: string-list>

function SieveRemoveFlag(id) 
{
  this.id = id;
  this.whiteSpace 
    = new Array(new SieveDeadCode(this.id+"_0"),
                new SieveDeadCode(this.id+"_2"));  
                
  this.flaglist = new SieveStringList(this.id+"_1");
}

SieveRemoveFlag.prototype.parse
    = function (data)
{
  // Syntax :
  // <"fileinto"> <string> <";">
  
  data = data.slice("removeflag".length);
  
  // ... eat the deadcode before the string...
  data = this.whiteSpace[0].parse(data);
      
  data = this.flaglist.parse(data)

  data = this.whiteSpace[1].parse(data);
    
  // ... and finally remove the semicolon;
  if (isSieveSemicolon(data) == false)
    throw "Syntaxerror: Semicolon expected";
    
  return data.slice(1);
}

SieveRemoveFlag.prototype.getID
    = function ()
{
  return this.id;
}

SieveRemoveFlag.prototype.toString
    = function ()
{
  return "removeflag"
    + this.whiteSpace[0].toString()
    + this.flaglist
    + this.whiteSpace[1].toString()        
    + ";";
}

SieveRemoveFlag.prototype.toXUL
    = function ()
{
  return "Remove Flag";
}

/******************************************************************************/

//hasflag [MATCH-TYPE] <variable-list: string-list> <list-of-flags: string-list>
             
function SieveHasFlagTest(id)
{
  this.id = id;
//  this.data  = new Object();
  this.whiteSpace     = new Array();
  this.whiteSpace[0]  = new SieveDeadCode(this.id+"_0");
  this.matchType      = null;
  this.whiteSpace[1]  = new SieveDeadCode(this.id+"_2");
  this.flagList       = new SieveStringList(this.id+"_3");
  this.whiteSpace[2]  = new SieveDeadCode(this.id+"_4");
}

SieveHasFlagTest.prototype.parse
    = function (data)
{
  data = data.slice("hasflag".length);
  
  this.whiteSpace[0].parse(data)
  
  if (isSieveMatchType(data))
  {
    this.matchType = new SieveMatchType(this.id+"_1");
    data = this.matchType.parse(data);
    
    data = this.whiteSpace[1].parse(data);    
  }
  
  data = this.flagList.parse(data);
  data = this.whiteSpace[2].parse(data);
      
  return data;
}    

SieveHasFlagTest.prototype.getID
    = function ()
{
  return this.id;
}

SieveHasFlagTest.prototype.toString
    = function ()
{
  return "hasflag"
    + this.whiteSpace[0].toString()
    + ((this.matchType != null)?this.matchType[0].toString():"")
    + ((this.matchType != null)?this.whiteSpace[1].toString():"")
    + this.flagList.toString()
    + this.whiteSpace[2].toString();
}

SieveHasFlagTest.prototype.toXUL
    = function ()
{
  return "hasflag Test - to be impelented";
}
