const { ccclass, property } = cc._decorator;

@ccclass
class flipCards extends cc.Component {

    @property(cc.SpriteFrame)
    back = null;

    @property(cc.SpriteFrame)
    front = null;

    @property(cc.Sprite)
    sprite = null;

    default_vert = "default_vert.vs";
    default_frag = "card.fs";
    playAnim = false;
    stat = false; // 背面
    scale = 1;  // 透视参数，暂设为1-0.8;

    onLoad() {
        cc.loader.loadRes("shader/" + this.default_vert, (err,txt) => {
            if(err){
                cc.log(err)
            }else{
                this._default_vert = txt;
                cc.loader.loadRes("shader/" + this.default_frag, (err,txt) => {
                    if(err){
                        cc.log(err)
                    }else{
                        this._card_frag = txt;
                        this.node.opacity = 255;
                        this._use();
                    }
                });
            }
        });
    }

    flip() {
        if(this.playAnim) return;
        this.playAnim = true;
        this.node.runAction(cc.sequence(
            cc.scaleTo(1, 0, 1),
            cc.callFunc(() => {
                this.sprite.spriteFrame = this.stat ? this.back : this.front;
                this.stat = !this.stat;
            }),
            cc.scaleTo(1, 1, 1),
            cc.callFunc(() => {
                this.playAnim = false;
            })
        ));
    }

    _use() {
        this._program = new cc.GLProgram();
        if (cc.sys.isNative) {
            cc.log("use native GLProgram");
            this._program.initWithString(this._default_vert, this._card_frag);

            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);

            this._program.link();
            this._program.updateUniforms();

            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
            glProgram_state.setUniformFloat( "scale", this.scale );
        }else{
            this._program.initWithVertexShaderByteArray(this._default_vert, this._card_frag);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            this._program.link();
            this._program.updateUniforms();

            this._scale = this._program.getUniformLocationForName( "scale" );

            this._program.setUniformLocationWith1f( this._scale, this.scale );
        }
        this.setProgram( this.node._sgNode, this._program );
    }

    setProgram(node, program) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        }else{
            node.setShaderProgram(program);    
        }
        
        var children = node.children;
        if (!children)
            return;
    
        for (var i = 0; i < children.length; i++)
        {
            this.setProgram(children[i], program);
        }
    }

    update() {
        if(!this.playAnim) return;
        this.scale = this.node.scaleX * 0.2 + 0.8;
        if(this.stat) {
            this.scale *= -1;
        }
        if(this._program) {
            this._program.use();
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
                glProgram_state.setUniformFloat( "scale", this.scale );
            }else{
                this._program.setUniformLocationWith1f( this._scale, this.scale );
            }
            this.setProgram( this.node._sgNode, this._program );
        }
    }
}