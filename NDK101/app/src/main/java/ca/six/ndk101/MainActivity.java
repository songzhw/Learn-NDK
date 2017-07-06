package ca.six.ndk101;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setValue(33,"Shark");
        setValue(13, "Songzhw");


        TextView tv = (TextView)findViewById(R.id.sample_text);
        StringBuilder sb = new StringBuilder();
        sb.append(stringFromJNI()+"\n");
        sb.append(getValue(23)+"\n");
        sb.append(getValue(13)+"\n");
        tv.setText(sb.toString());
    }

    public native String stringFromJNI();
    public native String getValue(int key);
    public native void setValue(int key, String value);

    static {
        System.loadLibrary("native-lib");
    }
}
