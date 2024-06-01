import React from "react";

function Like({ className, fill }: { className?: string; fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      width="25"
      height="25"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g>
        <g transform="matrix(1,0,0,1,0,0)" opacity="1">
          <g
            opacity="1"
            transform="matrix(0,0,0,0,19.910999298095703,19.000999450683594)"
          >
            <path
              fill={fill}
              d=" M-10.095999717712402,2.884000062942505 C-10.095999717712402,3.799999952316284 -9.972000122070312,4.686999797821045 -9.739999771118164,5.53000020980835 C-9.508000373840332,6.373000144958496 -9.168999671936035,7.171000003814697 -8.737000465393066,7.9079999923706055 C-8.305000305175781,8.645000457763672 -7.781000137329102,9.321999549865723 -7.181000232696533,9.92199993133545 C-6.580999851226807,10.522000312805176 -5.9039998054504395,11.04699993133545 -5.166999816894531,11.479000091552734 C-4.429999828338623,11.91100025177002 -3.631999969482422,12.25 -2.7890000343322754,12.482000350952148 C-1.9459999799728394,12.71399974822998 -1.059000015258789,12.838000297546387 -0.14300000667572021,12.838000297546387 C1.2309999465942383,12.838000297546387 2.5399999618530273,12.5600004196167 3.7309999465942383,12.055999755859375 C4.921999931335449,11.552000045776367 5.99399995803833,10.822999954223633 6.894999980926514,9.92199993133545 C7.796000003814697,9.020999908447266 8.524999618530273,7.948999881744385 9.029000282287598,6.757999897003174 C9.532999992370605,5.566999912261963 9.810999870300293,4.257999897003174 9.810999870300293,2.884000062942505 C9.810999870300293,1.5099999904632568 9.532999992370605,0.20100000500679016 9.029000282287598,-0.9900000095367432 C8.524999618530273,-2.180999994277954 7.796000003814697,-3.253000020980835 6.894999980926514,-4.1539998054504395 C5.99399995803833,-5.054999828338623 4.921999931335449,-5.783999919891357 3.7309999465942383,-6.288000106811523 C2.5399999618530273,-6.791999816894531 1.2309999465942383,-7.070000171661377 -0.14300000667572021,-7.070000171661377 C-1.5169999599456787,-7.070000171661377 -2.8259999752044678,-6.791999816894531 -4.017000198364258,-6.288000106811523 C-5.208000183105469,-5.783999919891357 -6.28000020980835,-5.054999828338623 -7.181000232696533,-4.1539998054504395 C-8.081999778747559,-3.253000020980835 -8.8100004196167,-2.180999994277954 -9.314000129699707,-0.9900000095367432 C-9.817999839782715,0.20100000500679016 -10.095999717712402,1.5099999904632568 -10.095999717712402,2.884000062942505z"
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,19.905000686645508,19.000999450683594)"
          >
            <path
              fill={fill}
              d=" M-9.713000297546387,9.64799976348877 C-9.034000396728516,11.965999603271484 -6.910999774932861,13.562000274658203 -4.494999885559082,13.569999694824219 C-4.494999885559082,13.569999694824219 1.065000057220459,13.569999694824219 1.065000057220459,13.569999694824219 C2.3329999446868896,13.569000244140625 3.562999963760376,13.125 4.538000106811523,12.314000129699707 C4.538000106811523,12.314000129699707 5.752999782562256,11.305000305175781 5.752999782562256,11.305000305175781 C6.672999858856201,10.541000366210938 7.830999851226807,10.121000289916992 9.026000022888184,10.119999885559082 C9.026000022888184,10.119999885559082 9.982999801635742,10.119999885559082 9.982999801635742,10.119999885559082 C11.395000457763672,10.118000030517578 12.538000106811523,8.97599983215332 12.539999961853027,7.564000129699707 C12.539999961853027,7.564000129699707 12.539999961853027,-1.312000036239624 12.539999961853027,-1.312000036239624 C12.538000106811523,-2.7239999771118164 11.395000457763672,-3.86899995803833 9.982999801635742,-3.869999885559082 C7.447000026702881,-3.869999885559082 0.6610000133514404,-4.96999979019165 -0.26499998569488525,-9.98799991607666 C-0.8790000081062317,-13.312000274658203 -2.9649999141693115,-13.569999694824219 -3.5869998931884766,-13.569999694824219 C-3.750999927520752,-13.569999694824219 -3.9140000343322754,-13.555999755859375 -4.076000213623047,-13.527000427246094 C-5.8429999351501465,-13.173999786376953 -7,-11.468999862670898 -6.676000118255615,-9.696999549865723 C-6.676000118255615,-9.696999549865723 -5.644000053405762,-3.869999885559082 -5.644000053405762,-3.869999885559082 C-5.644000053405762,-3.869999885559082 -8.472999572753906,-3.869999885559082 -8.472999572753906,-3.869999885559082 C-9.692999839782715,-3.875999927520752 -10.843999862670898,-3.302999973297119 -11.572999954223633,-2.3239998817443848 C-12.309000015258789,-1.3539999723434448 -12.539999961853027,-0.09099999815225601 -12.197999954223633,1.0770000219345093 C-12.197999954223633,1.0770000219345093 -9.713000297546387,9.64799976348877 -9.713000297546387,9.64799976348877z M-10.267000198364258,-1.3530000448226929 C-9.843999862670898,-1.9220000505447388 -9.175999641418457,-2.25600004196167 -8.467000007629395,-2.253000020980835 C-8.467000007629395,-2.253000020980835 -3.6989998817443848,-2.253000020980835 -3.6989998817443848,-2.253000020980835 C-3.6989998817443848,-2.253000020980835 -5.067999839782715,-9.982000350952148 -5.067999839782715,-9.982000350952148 C-5.248000144958496,-10.871999740600586 -4.679999828338623,-11.741999626159668 -3.7929999828338623,-11.934000015258789 C-2.881999969482422,-12.093000411987305 -2.1470000743865967,-11.234000205993652 -1.8619999885559082,-9.701000213623047 C-1.3619999885559082,-7.000999927520752 0.5109999775886536,-4.882999897003174 3.559999942779541,-3.5789999961853027 C5.60099983215332,-2.742000102996826 7.7779998779296875,-2.2899999618530273 9.982999801635742,-2.250999927520752 C10.498000144958496,-2.25 10.913999557495117,-1.8339999914169312 10.914999961853027,-1.3200000524520874 C10.914999961853027,-1.3200000524520874 10.914999961853027,7.557000160217285 10.914999961853027,7.557000160217285 C10.913999557495117,8.071000099182129 10.498000144958496,8.487000465393066 9.982999801635742,8.48799991607666 C9.982999801635742,8.48799991607666 9.027000427246094,8.48799991607666 9.027000427246094,8.48799991607666 C7.452000141143799,8.48900032043457 5.927000045776367,9.041000366210938 4.715000152587891,10.04800033569336 C4.715000152587891,10.04800033569336 3.5,11.059000015258789 3.5,11.059000015258789 C2.815999984741211,11.626999855041504 1.9550000429153442,11.939000129699707 1.065999984741211,11.939000129699707 C1.065999984741211,11.939000129699707 -4.489999771118164,11.939000129699707 -4.489999771118164,11.939000129699707 C-6.183000087738037,11.932999610900879 -7.670000076293945,10.814000129699707 -8.145999908447266,9.189000129699707 C-8.145999908447266,9.189000129699707 -10.625,0.6200000047683716 -10.625,0.6200000047683716 C-10.824000358581543,-0.0560000017285347 -10.690999984741211,-0.7850000262260437 -10.267999649047852,-1.3480000495910645 C-10.267999649047852,-1.3480000495910645 -10.267000198364258,-1.3530000448226929 -10.267000198364258,-1.3530000448226929z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Like;
