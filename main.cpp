#include <iostream>
#include <cmath>
#include <cstdlib>
#include <cstdio>
#include <string>
#include <sstream>

#define PI 3.14159265

//Global Varibles
//double r, R;  // Angle to rotate
    float d;  // Angle desired
    float a;  // Angle of v-sticks
    //dEst();
    float h;
    float MH;
    float MW;
    float hh;
    int sel;
    int NumberOfPasses = 0;
    int x = 0;
    int y = 0;
    int Total = 0;
    int XStrokes = 0;
    int StartingNumber = 0;


void get_int(int& d, std::string prompt, std::string fail)
{
    while(1) {

        std::cout << prompt;
        std::string str;
        std::cin >> str;

        std::istringstream ss(str);
        int val1;
        ss >> val1;

        if(!ss.eof()) {
            std::cout << fail;
            continue;
        } else {
            d = val1;
            break;
        }
    }
}

void get_float(float& d, std::string prompt, std::string fail)
{
    while(1) {

        std::cout << prompt;
        std::string str;
        std::cin >> str;

        std::istringstream ss(str);
        float val1;
        ss >> val1;

        if(!ss.eof()) {
            std::cout << fail;
            continue;
        } else {
            d = val1;
            break;
        }
    }
}

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

int DisplayTotal(){
    y=(NumberOfPasses/10)+1;
    x=(NumberOfPasses*y);
    StartingNumber=2*NumberOfPasses;
    Total=(x+2)+(StartingNumber);
    XStrokes=(Total)/2;
    for (NumberOfPasses; NumberOfPasses >= 9; NumberOfPasses-=10) {
    std::cout << "\t-----" << NumberOfPasses << "-----"<< std::endl;

}
    std::cout << "\t-----05-----" << std::endl;
    std::cout << "\t-----03-----" << std::endl;
    std::cout << "\t-----02-----" << std::endl;
    std::cout << "\t-----01-----" << std::endl;
    std::cout << "\t     " << Total <<  " <<Total Passes Counted"  << std::endl;
    std::cout << "\t     " << XStrokes << " <<X-Strokes/Passes Per Side\n";
};


int main()
{
    //std::cout << "Please Select 1)Rotate, 2)Tilting, 3)Chart, or 4)Angle:>";
    //std::cin >> sel;
    get_int(sel, "Please Select 1)Rotate, 2)Tilting, 3)Chart, 4)Angle, 5)Pass Count 6)Exit:>", "Please enter a valid selection \n");
    switch (sel)
    {
    case 1:
    //case '1':
    //case 'R':
    //case 'r':
        {
       // std::cout << "Enter desired angle" << std::endl;
        //std::cin >> d;
        get_float(d, "Enter desired angle ", "Sorry, that's not an number. \n");
        //std::cout << "Enter V stick angle" << std::endl;
        //std::cin >> a;
        get_float(a, "Enter V Stick Angle ", "Sorry, that's not an number. \n");
        std::cout << "For Rotating:  " << rad2deg(acos(dcsc(a)*dsin(d))) << std::endl;
        std::cout << "Press Enter" << std::endl;
        std::cin.ignore().get();
        break;
        }
    case 2:
    //case 'T':
    //case 't':
        {
        //std::cout << "Enter desired angle" << std::endl;
        //std::cin >> d;
        get_float(d, "Enter desired angle ", "Sorry, that's not an number. \n");
        //std::cout << "Enter V stick angle" << std::endl;
        //std::cin >> a;
        get_float(a, "Enter V Stick Angle ", "Sorry, that's not an number. \n");
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
        std::cout << "Press Enter" << std::endl;
        std::cin.ignore().get();
        break;
        }
    case 3:
    //case 'C':
    //case 'c':
        {
        //std::cout << "Enter desired angle" << std::endl;
       // std::cin >> d;
        //std::cout << "Enter V stick angle" << std::endl;
        //std::cin >> a;
        get_float(a, "Enter V Stick Angle ", "Sorry, that's not an number. \n");
        std::cout << "Angle Solutions: -------------------------" << std::endl;
        for ( int x = 1 ;  x < a;  x++)
        {

            std::cout << "R for " << a << "* @ " << x << " -- " << rad2deg(acos(dcsc(a)*dsin(x))) << std::endl;

        }
        std::cout << "Press Enter" << std::endl;
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
    case 4:
    //case 'A':
    //case 'a':
        {
        //std::cout << "Enter Measured Width: ";
        //std::cin >> MW;
        get_float(MW, "Enter Measured Width: ", "Sorry, that's not number. \n");
        std::cout << std::endl;
        //std::cout << "Enter Measured Height: ";
        //std::cin >> MH;
        get_float(MH, "Enter Measured Height: ", "Sorry, that's not an number. \n");
        std::cout << MeasuredAngle(MW,MH);
        std::cout << std::endl << "Press Enter" << std::endl;
        std::cin.ignore().get();
        break;
        }
    case 5:
    {
        get_int(NumberOfPasses, "Please enter starting passes per side: ", "Sorry, that's not an integer. \n");
        //cout << "Enter number of passes per side:> " ;
        //cin >> NumberOfPasses;
        //NumberOfPasses=StartingNumber;
        if (NumberOfPasses >=10 )
        {
            DisplayTotal();
        }
        else
        {
        std::cout << "Please enter a number 10 or greater\n";
        main();
        }
        std::cout << std::endl << "Press Enter" << std::endl;
        std::cin.ignore().get();
        break;
    }
    case 6:
    {
        return 0;
        break;
    }

    default:
        {
        std::cout << "Please Enter A Valid Option";
        }
    }

     return 0;
}



