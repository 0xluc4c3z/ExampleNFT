// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

import "forge-std/Test.sol";
import "../src/ExampleNFT.sol";

contract ContractBTest is Test {
    ExampleNFT public exampleNft;

    address public admin = address(0x1);
    address public alice = address(0x2);
    address public bob = address(0x3);

    

    function setUp() public {
        vm.deal(alice, 1 ether);
        vm.deal(bob, 1 ether);

        
        vm.startPrank(admin);
        exampleNft = new ExampleNFT();
        exampleNft.setPresaleActive(true);
        exampleNft.setSaleActive(true);
        vm.stopPrank();
    }

    function testMintReserved() public {
        vm.prank(admin);
        exampleNft.mintReserved(1);
        assertEq(exampleNft.balanceOf(address(admin)), 1);
        
    }

    function testPreSale() public {
        assertTrue(exampleNft.presaleActive());

        vm.prank(alice);
        exampleNft.mintPresale{value: 0.05 ether}(1);
    }

    function testSale() public {
        vm.prank(bob);
        exampleNft.mintToken{value: 0.1 ether}(2);
        assertEq(exampleNft.balanceOf(address(bob)), 2);
    }

    function testSale2() public {
        vm.prank(bob);
        exampleNft.mintToken{value: 0.05 ether}(1);
        assertEq(exampleNft.balanceOf(address(bob)), 1);
    }
}