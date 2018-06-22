#ifdef GL_ES
precision mediump float;
#endif
varying vec2 v_texCoord;
uniform float scale;
void main()
{
	float x = v_texCoord.x;
	float y = v_texCoord.y;
	float s = scale;
	if(scale < .0) {
		s = -scale;
		x = 1. - x;
	}
	float y1 = (y - (1.0 - s) / 2. * x) / (1.0 - x + s * x);
    vec4 v;
    if( y1 > 1.0) discard;
    if( y1 < 0.0) discard;
	v = texture2D(CC_Texture0, vec2(v_texCoord.x, y1)).rgba;
    gl_FragColor = vec4(v.r, v.g, v.b, v.a);
}