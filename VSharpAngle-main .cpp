#include <iostream>
#include <cmath>

#define PI 3.14159265


float deg2rad(float deg)
{
    return ((deg) * (PI / 180));
}

float rad2deg(float deg)
{
    return ((deg) / (PI / 180));

}

float dcos(float deg)
{
    return cos(deg2rad(deg));

}

float dsin(float deg)
{
    return sin(deg2rad(deg));
}

float dcsc(float deg)
{
    return 1/sin(deg2rad(deg));
}

void cosout(float R)
{
    std::cout << "COS R = " << dcos(R) << std::endl;
}

void sinout(float D, float A)
{
    std::cout << (dsin(D)/dsin(A)) << std::endl;
}
void dEst()
{
    for (float x = 1 ; x < 90 ; x++ )
    {
        cosout(x);
    }
    for (float x = 1 ; x < 90 ; x++ )
    {
        sinout(15 , x);
    }
    for (float x = 1 ; x < 90 ; x++ )
    {
        sinout(20 , x);
    }
}

float StickAngle(float da, float aa)
{

    return (da - aa) * (0.125);


}


float MeasuredAngle (float mw, float mh)
{
    float ans;
    float ang;
    ans = ((mw/2)/mh);
    ang = asin(ans);
    return rad2deg(ang);
}

float AbsoluteVal(float abv)
{

    return std::abs(abv);
}

int main()
{
    //double r, R;  // Angle to rotate
    float d;  // Angle desired
    float a;  // Angle of v-sticks
    //dEst();
    float h;
    float MH;
    float MW;
    float hh;
    char sel;
    std::cout << "Please Select 1)Rotate, 2)Tilting, 3)Chart, or 4)Angle:>";
    std::cin >> sel;
    switch (sel)
    {
    case '1':
    case 'R':
    case 'r':
        {
        std::cout << "Enter desired angle" << std::endl;
        std::cin >> d;
        std::cout << "Enter V stick angle" << std::endl;
        std::cin >> a;
        std::cout << "For Rotating:  " << rad2deg(acos(dcsc(a)*dsin(d))) << std::endl;
        std::cout << "Press Any Key" << std::endl;
        std::cin.ignore().get();
        break;
        }
    case '2':
    case 'T':
    case 't':
        {
        std::cout << "Enter desired angle" << std::endl;
        std::cin >> d;
        std::cout << "Enter V stick angle" << std::endl;
        std::cin >> a;
        std::cout << "For tilting:" << std::endl;
        std::cout << std::endl;
        hh = StickAngle(d,a);
        if (hh > 0)
        {
            std::cout << "Near Side ";
        }
        else
        {
            std::cout << "Far Side ";
        }
        std::cout << "Height to raise: " << AbsoluteVal(StickAngle(d,a)) << " Near Stick: " << d << " Far Stick: " << (a) - (d-a) << std::endl;;
        std::cout << "Press Any Key" << std::endl;
        std::cin.ignore().get();
        break;
        }
    case '3':
    case 'C':
    case 'c':
        {
        //std::cout << "Enter desired angle" << std::endl;
       // std::cin >> d;
        std::cout << "Enter V stick angle" << std::endl;
        std::cin >> a;

        std::cout << "Angle Solutions: -------------------------" << std::endl;
        for ( int x = 1 ;  x < a;  x++)
        {

            std::cout << "R for " << a << "* @ " << x << " -- " << rad2deg(acos(dcsc(a)*dsin(x))) << std::endl;

        }
        std::cout << "Press Any Key" << std::endl;
        std::cin.ignore().get();
        break;
        /*for (int x = 1; x < 20 ; x++)
        {
            std::cout << "R for 20* @ " << x << " -- " << rad2deg(acos(dcsc(20)*dsin(x))) << std::endl;
        }
        for (int x = 1; x < 25 ; x++)
        {
            std::cout << "R for 25* @ " << x << " -- " << rad2deg(acos(dcsc(25)*dsin(x))) << std::endl;
        }
        */
        }
    case '4':
    case 'A':
    case 'a':
        {
        std::cout << "Enter Measured Width: ";
        std::cin >> MW;
        std::cout << std::endl;
        std::cout << "Enter Measured Height: ";
        std::cin >> MH;
        std::cout << MeasuredAngle(MW,MH);
        std::cout << std::endl << "Press Any Key" << std::endl;
        std::cin.ignore().get();
        break;
        }
    default:
        {
        std::cout << "Please Enter A Valid Option";
        }
    }

     return 0;
}



