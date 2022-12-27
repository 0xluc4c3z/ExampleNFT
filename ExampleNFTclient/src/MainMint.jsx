import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text, Link } from "@chakra-ui/react";
import exampleNFT from './ExampleNFT.json';

const exampleNFTAddress = '0x06D1585715Dd94DeDb63807fA7Bb34170325ee70';

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [error, setError] = useState('');
  const [color, setColor] = useState('');
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if(window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        exampleNFTAddress,
        exampleNFT.abi,
        signer
      );
      try{
        const response = await contract.mintToken(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.05 * mintAmount).toString()), 
        });
        console.log('response', response);
        setError('successful mint');
        setColor('greenyellow')
      } catch (err){
        console.log("error: ", err);
        setError('mistake in the mint');
        setColor('red')
      }
    }
  }

  async function handlePre() {
    if(window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        exampleNFTAddress,
        exampleNFT.abi,
        signer
      );
      try{
        const response = await contract.mintToken(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.05 * mintAmount).toString()), 
        });
        console.log('response', response);
        setError('successful mint');
        setColor('greenyellow')
      } catch (err){
        console.log("error: ", err);
        setError('mistake in the mint');
        setColor('red')
      }
    }
  }

  async function handleWhite() {
    if(window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        exampleNFTAddress,
        exampleNFT.abi,
        signer
      );
      try{
        const response = await contract.mintReserved(BigNumber.from(mintAmount));
        
        console.log('response', response);
        setError('successful mint');
        setColor('greenyellow')
      } catch (err){
        console.log("error: ", err);
        setError('mistake in the mint');
        setColor('red')
      }
    }
  }

  const handleDecrement = () => {
    if(mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  }

  const handleIncrement = () => {
    if(mintAmount >= 2) return;
    setMintAmount(mintAmount + 1);
  }

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
    <Box width="520px">
      <div>
        <Text fontSize="48px" textShadow="0 5px #000000">
          ExampleNFT
        </Text>
        <Text
          fontSize="30px"
          letterSpacing="-5.5%"
          fontFamily="VT323"
          textShadow="0 2px 2px #000000"
        >
          This website is for demo purposes only.
        </Text>
        <Text
          fontSize="30px"
          letterSpacing="-5.5%"
          fontFamily="VT323"
          textShadow="0 2px 2px #000000"
        >
          View the example in <Link href="https://testnets.opensea.io/collection/examplenft-8zqjvdlnvo" isExternal>Opensea</Link>
        </Text>
        <Text
          fontSize="30px"
          letterSpacing="-5.5%"
          fontFamily="VT323"
          textShadow="0 2px 2px #000000"
        >
          View your transaction in <Link href="https://goerli.etherscan.io/address/0x06D1585715Dd94DeDb63807fA7Bb34170325ee70" isExternal>Etherscan</Link>
        </Text>
        <Text
          color={color}
          fontSize="30px"
          letterSpacing="-5.5%"
          fontFamily="VT323"
          textShadow="0 2px 2px #000000"
        >
          {error}
        </Text>
      </div>

      {isConnected ? (
        <div>
          <Flex justify="center" align="center">
            <Button
              backgroundColor="#008fd4"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              margin="10"
              onClick={handleDecrement}
            >
              {" "}
              -
            </Button>

            <Input
              readOnly
              fontFamily="inherit"
              width="100px"
              height="40px"
              textAlign="center"
              paddingLeft="19px"
              marginTop="10px"
              type="number"
              value={mintAmount}
            />

            <Button
              backgroundColor="#008fd4"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              margin="10"
              onClick={handleIncrement}
            >
              {" "}
              +
            </Button>
          </Flex>

          <Button
            backgroundColor="#008fd4"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin="10"
            onClick={handlePre}
          >
            Mint PreSale
          </Button>
          <Button
            backgroundColor="#008fd4"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin="10"
            onClick={handleWhite}
          >
            Mint WhiteList
          </Button>
          <Button
            backgroundColor="#008fd4"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin="10"
            onClick={handleMint}
          >
            Mint Sale
          </Button>
        </div>
      ) : (
        <Text
          marginTop="70px"
          fontSize="30px"
          letterSpacing="5.5%"
          fontFamily="VT323"
          textShadow="0 3px #000000"
          color="#008fd4"
        >
          Connect your wallet to mint.
        </Text>
      )}
    </Box>
  </Flex>
  )
}

export default MainMint;
