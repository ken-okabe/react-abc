"use strict";
//worldcomponent the tiny FRP
//copy-pasted here, available in npm-------------
var worldcomponent = function(initialVal)
{
  var computingF = [];
  var value = {};
  var state;
  Object.defineProperties(value,
  {
    val: //value.val
    {
      get: function()
      {
        return state;
      },
      set: function(x)
      {
        state = x;
        computingF.map(
          function(f)
          {
            f(x);
          });
        return;
      }
    }
  });
  var o = {
    compute: function(f)
    {
      var f1 = function()
      {
        computingF[computingF.length] = f; //push  f
        value.val = initialVal;
      };
      return f1;
    },
    appear: function(a)
    {
      var f1 = function(){value.val = a;};
      return f1;
    },
    now: function()
    {
      return value.val;
    }
  };

  return o;
};

Object.defineProperties(worldcomponent,
{
  world: //our physical world
  {
    set: function(f)
    {
      return f();
    }
  }
});

worldcomponent.log = function(a)
{
  var f = console.log.bind(console, a);
  return f;
};
//-----------------------------------------

var ___ = worldcomponent;
___.world = ___.log('start!'); //debug log

var ___time = ___(0);

var f = function()
{
  ___.world = ___time.appear(___time.now() + 1);
};
var timer = setInterval(f, 1000);

var Timer = React.createClass(
{
  componentDidMount: function()
  {
    var com = this;
    ___.world = ___time.compute(function(x)
    {
      com.forceUpdate();
    });
  },
  render: function()
  {
    var el = (<div>Seconds Elapsed: {___time.now()}</div>);
    return el;
  }
});

var TopComponent = React.render(<Timer/>, document.body);
