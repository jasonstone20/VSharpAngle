#include <iostream>
#include <cmath>
#include <cstdlib>
#include <cstdio>
#include <string>
#include <sstream>

#define PI 3.14159265

void get_int(int& d, std::string prompt, std::string fail);
void get_float(float& d, std::string prompt, std::string fail);
float deg2rad(float Degree);
float rad2deg(float Degree);
float dcos(float Degree);
float dsin(float Degree);
float dcsc(float Degree);
void cosout(float R);
void sinout(float D, float A);
void dEst();
float StickAngle(float Length, float Height);
float SideAngle(float SideA, float SideB, float SideC);
float MeasuredAngle (float MWidth, float MHeight);
float AbsoluteVal(float abv);
float MetricCon();
int DisplayTotal();
void Rotate();
void Tilting();
void Chart();
void Angle();
void Passes();
int Quit();
int Menu();

int main(int argc, int *argv[])
{
     Menu();
     return 0;
}

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

float deg2rad(float Degree)
{
    return ((Degree) * (PI / 180));
}

float rad2deg(float Degree)
{
    return ((Degree) / (PI / 180));

}

float dcos(float Degree)
{
    return cos(deg2rad(Degree));

}

float dsin(float Degree)
{
    return sin(deg2rad(Degree));
}

float dcsc(float Degree)
{
    return 1/sin(deg2rad(Degree));
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

float StickAngle(float Length, float Height)
{

    return (Length - Height) * (0.125);


}

float SideAngle (float SideA, float SideB, float SideC)
{
    float PowA = pow(SideA, 2);
    float PowB = pow(SideB, 2);
    float PowC = pow(SideC, 2);
    float Top (PowA+PowB-PowC);
    float Bottom (2*SideA*SideB);

    float Answer = (Top/Bottom);
    float ACosAnswer = acos(Answer);
    //float ACosAnswer = (CosAnswer);
    float Inclusive =  rad2deg(ACosAnswer);
    float PerSide = Inclusive/2;
    std::cout <<  "Inclusive: \n" << Inclusive << "\nPer Side: \n";
    return PerSide;
}

float MeasuredAngle (float MWidth, float MHeight)
{
    float ans;
    float ang;
    ans = ((MWidth/2)/MHeight);
    ang = asin(ans);
    return rad2deg(ang);
}



float AbsoluteVal(float AbsoluteValue)
{

    return std::abs(AbsoluteValue);
}

float MetricCon(float met)
{
    return (met)*(2.54);
}

int DisplayTotal(int NumberOfPasses)
{
    //int NumberOfPasses = 0;
    int x = 0;
    int y = 0;
    int Total = 0;
    int XStrokes = 0;
    int StartingNumber = 0;
    y=(NumberOfPasses/10)+1;
    x=(NumberOfPasses*y);
    StartingNumber=2*NumberOfPasses;
    Total=(x+2)+(StartingNumber);
    XStrokes=(Total)*2;
    for (NumberOfPasses; NumberOfPasses >= 9; NumberOfPasses-=10)
    {
        std::cout << "\t-----" << NumberOfPasses << "-----"<< std::endl;

    }
        std::cout << "\t-----05-----" << std::endl;
        std::cout << "\t-----03-----" << std::endl;
        std::cout << "\t-----02-----" << std::endl;
        std::cout << "\t-----01-----" << std::endl;
        std::cout << "\t     " << Total <<  " <<Total Passes Per Side Counted"  << std::endl;
       std::cout << "\t     " << XStrokes << " <<Total X-Strokes\n";
};

void Rotate()
{
    float DesiredRotate;
    float StickAngleRotate;
    // std::cout << "Enter desired angle" << std::endl;
    //std::cin >> d;
    get_float(DesiredRotate, "Enter desired angle ", "Sorry, that's not an number. \n");
    //std::cout << "Enter V stick angle" << std::endl;
    //std::cin >> a;
    get_float(StickAngleRotate, "Enter V Stick Angle ", "Sorry, that's not an number. \n");
    std::cout << "For Rotating:  " << rad2deg(acos(dcsc(StickAngleRotate)*dsin(DesiredRotate))) << std::endl;
    std::cout << "Press Enter" << std::endl;
    std::cin.ignore().get();
}

void Tilting()
{
    float DesiredAngle;
    float AngleOfStick;
    float ResultAngle;
    float MetricResult;
    //std::cout << "Enter desired angle" << std::endl;
    //std::cin >> d;
    get_float(DesiredAngle, "Enter desired angle ", "Sorry, that's not an number. \n");
    //std::cout << "Enter V stick angle" << std::endl;
    //std::cin >> a;
    get_float(AngleOfStick, "Enter V Stick Angle ", "Sorry, that's not an number. \n");
    std::cout << "For tilting:" << std::endl;
    std::cout << std::endl;
    ResultAngle = StickAngle(DesiredAngle,AngleOfStick);
    if (ResultAngle > 0)
    {
        std::cout << "Near Side ";
    }
    else
    {
        std::cout << "Far Side ";
    }
    MetricResult = AbsoluteVal(StickAngle(DesiredAngle,AngleOfStick));
    std::cout << "Height to raise: Inches> " << AbsoluteVal(ResultAngle) << " CM> "<< MetricCon(MetricResult) <<"\nStick Angles: " << "\n Near Stick: " <<
        DesiredAngle << " Far Stick: " << (AngleOfStick) - (DesiredAngle - AngleOfStick) << std::endl;;
    std::cout << "Press Enter" << std::endl;
    std::cin.ignore().get();
}

void Chart()
{
    //std::cout << "Enter desired angle" << std::endl;
    // std::cin >> d;
    //std::cout << "Enter V stick angle" << std::endl;
    //std::cin >> a;
    float ChartAngle;
    get_float(ChartAngle, "Enter V Stick Angle ", "Sorry, that's not an number. \n");
    std::cout << "Angle Solutions: -------------------------" << std::endl;
    for ( int x = 1 ;  x < ChartAngle;  x++)
    {

        std::cout << "R for " << ChartAngle << "* @ " << x << " -- " << rad2deg(acos(dcsc(ChartAngle)*dsin(x))) << std::endl;
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
    std::cout << "Press Enter" << std::endl;
    std::cin.ignore().get();
}

void Angle()
{
    //std::cout << "Enter Measured Width: ";
    //std::cin >> MW;
    float MeasuredWidth;
    float MeasuredHeight;
    float SideA;
    float SideB;
    float SideC;
    int sel = 0;

    get_int(sel, "2 or 3 known sides?: ", "Please enter 2 or 3. \n");

    switch (sel)
    {
        case 2:
        {
            get_float(MeasuredWidth, "Enter Measured Width: ", "Sorry, that's not number. \n");
            std::cout << std::endl;
            get_float(MeasuredHeight, "Enter Measured Height: ", "Sorry, that's not an number. \n");
            std::cout << MeasuredAngle(MeasuredWidth,MeasuredHeight);
            std::cout << std::endl;
            break;
        }
        case 3:
        {
            get_float(SideC, "Enter Measured Width: ", "Sorry, that's not number. \n");
            std::cout << std::endl;
            get_float(SideA, "Enter Side 1: ", "Sorry, that's not number. \n");
            std::cout << std::endl;
            get_float(SideB, "Enter Side 2: ", "Sorry, that's not number. \n");
            std::cout << std::endl;

            std::cout << SideAngle(SideA, SideB, SideC);
            break;
        }
        default:
        {
        std::cout << "Enter 2 or 3" << std::endl;
        }
    }
    std::cout << std::endl << "Press Enter" << std::endl;
    std::cin.ignore().get();
}


void Passes()
{
    int NumberOfPasses;
    get_int(NumberOfPasses, "Please enter starting passes per side: ", "Sorry, that's not an integer. \n");
    //cout << "Enter number of passes per side:> " ;
    //cin >> NumberOfPasses;
    //NumberOfPasses=StartingNumber;
    if (NumberOfPasses >=10 )
    {
        DisplayTotal(NumberOfPasses);
    }
    else
    {
    std::cout << "Please enter a number 10 or greater\n";
    //main();
    }
    std::cout << std::endl << "Press Enter" << std::endl;
    std::cin.ignore().get();
}

void EdgeRetention()
{
    int TCC = 0;
    int Hardness = 0;
    int EdgeAngle = 0;
    int CrC = 0;
    int CrVC = 0;
    int MC = 0;
    int M6C = 0;
    int MN = 0;
    int CrN = 0;
    int Fe3C6 = 0;
    std::cout << std::endl << "Steel      |  CrC  |  CrV  |  MC  |  M6C  |  MN  |  CrN  |  FeC  |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "CPM M4     |   -   |   -   |  5.5 |   5   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "410        |   3   |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "420        |   3   |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "AEB-L      |   6   |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "DC53       |   8   |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "440A       |  10   |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "440C       |  12   |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "D2         |  15.5 |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "154CM      |  17.5 |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "ATS34      |  17.5 |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "CPM154     |  17.5 |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "ZDP-189    |  36   |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "Cruwear    |   -   |  5.9  |  3.4 |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "S35VN      |   -   |  10.5 |  3.5 |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "BD-30P     |   -   |  10.5 |   4  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "S30V       |   -   |  10.5 |   4  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "S90V       |   -   |   13  |   9  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "CTS 20CP   |   -   |   13  |   9  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "S125V      |   -   |   16  | 12.5 |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "BG42       |   -   |   16  |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "Elmax      |   -   |   16  |   2  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "20CV       |   -   |  17.5 |  2.5 |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "CTS-204P   |   -   |  17.5 |  2.5 |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "S60V       |   -   |  21.5 |  2.1 |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "Vanax 35   |   -   |   -   |   -  |   -   |   9  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "Cronidur 30|   -   |   -   |   -  |   -   |   -  |  4.5  |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "3V         |   -   |   -   |  5.1 |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "Vandis 4E  |   -   |   -   |  8.2 |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "N690       |   16  |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "Rex 45     |   -   |   -   |  2.5 |  5.3  |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "5160       |   -   |   -   |   -  |   -   |   -  |   -   |   0   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "1095       |   -   |   -   |   -  |   -   |   -  |   -   |   3   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "O1         |   -   |   -   |   -  |   -   |   -  |   -   |   3   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "O2         |   -   |   -   |   -  |   -   |   -  |   -   |   3   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "52100      |   -   |   -   |   -  |   -   |   -  |   -   |   6   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "File Steel |   -   |   -   |   -  |   -   |   -  |   -   |   6   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "A2         |   6   |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "19C27      |   8   |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "Niolox     |   8   |   1   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "XHP/440V   |  22   |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "D7         |  24   |   -   |   -  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "K190       |   -   |  20   |   3  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "Vandis 8   |   -   |   -   |  15  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "10V        |   -   |   -   | 17.5 |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "Vanax      |   -   |   -   |   -  |   -   |   13 |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "Nitrobe77  |   -   |   -   |   -  |   -   |   2  |   4   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "15V        |   -   |   -   |  23  |   -   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "Rex 121    |   -   |   -   | 24.5 |   6   |   -  |   -   |   -   |" << std::endl;
    std::cout << std::endl << "-----------|-------|-------|------|-------|------|-------|-------|" << std::endl;
    std::cout << std::endl << "Steel      |  CrC  |  CrV  |  MC  |  M6C  |  MN  |  CrN  |  FeC  |" << std::endl;

    std::cout << std::endl << "Enter Steel Hardness (Rockwell C)" << std::endl;
    std::cin >> Hardness;
    std::cout << std::endl << "Enter Edge Angle (Inclusive)" << std::endl;
    std::cin >> EdgeAngle;
    std::cout << std::endl << "Enter CrC (Cr7C3+C23+C6" << std::endl;
    std::cin >> CrC;
    std::cout << std::endl << "Enter CrVC ((Cr1V)7C3)" << std::endl;
    std::cin >> CrVC;
    std::cout << std::endl << "Enter MC (NbC, VC or WC)" << std::endl;
    std::cin >> MC;
    std::cout << std::endl << "Enter M6C" << std::endl;
    std::cin >> M6C;
    std::cout << std::endl << "Enter MN (Vanadium Nitrides)" << std::endl;
    std::cin >> MN;
    std::cout << std::endl << "Enter CrN (CrN or Cr2N)" << std::endl;
    std::cin >> CrN;
    std::cout << std::endl << "Enter Fe3C6 (Fe3C6)" << std::endl;
    std::cin >> Fe3C6;
    //TCC = ((-157) + (15.8*Hardness) – (17.8*EdgeAngle) + (11.2*CrC) + (14.6*CrVC) + (26.2*MC) + (9.5*M6C) + (20.9*MN) + (19.4*CrN) + (5.0*Fe3C));
    TCC = ((-157) + (( 15.8 ) * (Hardness)) - ((17.8) * (EdgeAngle)) + ((11.2) * (CrC)) + ((14.6) * (CrVC)) + ((26.2) * (MC)) + ((9.5) * (M6C)) + ((20.9) * (MN)) + ((19.4) * (CrN)) + ((5.0) * (Fe3C6)));
    std::cout << std::endl << TCC << std::endl;
 }

int Quit()
{
    //return EXIT_SUCCESS;
    //exit(0);
}

int Menu()
{
    //float DesiredAngle;  // Angle desired
    //float AngleOfSticks;  // Angle of v-sticks
    //dEst();
    //float h;
    //float MH;
    //float MW;
    //float hh;
    int sel;

    //std::cout << "Please Select 1)Rotate, 2)Tilting, 3)Chart, or 4)Angle:>";
    //std::cin >> sel;
    while (1)
    {
        get_int(sel, "Please Select 1)Rotate, 2)Tilting, 3)Chart, 4)Angle, 5)Pass Count 6)CATRA TCC Steel Edge Retention 7)Exit:>", "Please enter a valid selection \n");
        switch (sel)
        {
        case 1:
        //case '1':
        //case 'R':
        //case 'r':
        {
            Rotate();
            break;
        }
        case 2:
        //case 'T':
        //case 't':
        {
            Tilting();
            break;
        }
        case 3:
        //case 'C':
        //case 'c':
        {
            Chart();
            break;
        }
        case 4:
        //case 'A':
        //case 'a':
        {
            Angle();
            break;
        }
        case 5:
        {
            Passes();
            break;
        }
        case 6:
        {
            EdgeRetention();
            break;
        }
        case 7:
        {
            return 0;
//            return EXIT_SUCCESS;
            //Quit();
            break;
        }

        default:
        {
            std::cout << "Please Enter A Valid Option \n";
        }
        }
    }

}
