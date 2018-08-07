(function () {
    'use strict';

    var WS = require('../proto/ws.js');
    var NetMsgHead = require('../proto/netmsg_head.js');
    require('../proto/common_pb.js');
    var Page = require('../pages/page.js');
    require('./const.js');

    module.exports = Gateway;

    function Gateway(user) {
        this.user = user;
        this.ws = null;
    }

    var proto1 = Gateway.prototype;

    proto1.Login = function () {
        var self = this;
        if (self.ws == null) {
            this.ws = new WS('gateway', self.onConnect.bind(self));
            this.ws.cmds[proto.proto.MsgTypeCmd.VERIFYSUCCESS] = self.onVerifySuccess.bind(self);
            this.ws.cmds[proto.proto.MsgTypeCmd.FORWARD] = self.onForward.bind(self);
        }
        this.ws.Connect(self.user.gatewayIP, self.user.gatewayPort);
    };

    proto1.onConnect = function () {
        var msg = new proto.proto.MsgVerify();
        msg.setAccount(this.user.account);
        msg.setToken(this.user.token);
        this.ws.Send(proto.proto.MsgTypeCmd.VERIFY, msg);
    };

    proto1.onVerifySuccess = function (data) {
        console.log('[gateway] verify success!');
        this.user.lobby.Login();
        Page.showPage('lobby');
    };

    proto1.onForward = function (data) {
        var head = new NetMsgHead(0, 0);
        head.decode(curBuf);
        t = int(head.cmd / MsgCmdOffset);
        switch (t) {
            case Lobby:
                this.user.lobby.OnRecvMsg(cmd, buff.slice(NetMsgHead.len));
                break;
        }
    };

    proto1.ForwardMsg = function (cmd, msg) {
        this.ws.Send(cmd, msg);
    };

})();